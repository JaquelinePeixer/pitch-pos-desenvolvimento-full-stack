package webservice.repository.users;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import webservice.domains.users.SearchDao;
import webservice.domains.users.User;

@Repository
@RequiredArgsConstructor
public class UserSearchDao {

	private final EntityManager entityManager;

	public Page<User> findAllByCriteria(SearchDao request, Pageable page) {

		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<User> criteriaQuery = criteriaBuilder.createQuery(User.class);

		List<Predicate> predicates = new ArrayList<>();

		Root<User> root = criteriaQuery.from(User.class);

		if (request.getName() != null) {
			Predicate namePredicate = criteriaBuilder.like(root.get("name"), "%" + request.getName() + "%");
			predicates.add(namePredicate);
		}

		if (request.getDelayedUsers() != null) {
			Predicate delayedUsersPredicate = criteriaBuilder.equal(root.get("delayedUsers"),
					request.getDelayedUsers());
			predicates.add(delayedUsersPredicate);
		}

		if (!predicates.isEmpty()) {
			criteriaQuery.where(criteriaBuilder.and(predicates.toArray(new Predicate[0])));
		}

		TypedQuery<User> query = entityManager.createQuery(criteriaQuery);

		query.setFirstResult((int) page.getOffset());
		query.setMaxResults(page.getPageSize());

		List<User> users = query.getResultList();

		CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);

		Root<User> countRoot = countQuery.from(User.class);

		List<Predicate> countPredicates = new ArrayList<>();
		if (request.getName() != null) {
			Predicate namePredicate = criteriaBuilder.like(countRoot.get("name"), "%" + request.getName() + "%");
			countPredicates.add(namePredicate);
		}

		if (request.getDelayedUsers() != null) {
			Predicate delayedUsersPredicate = criteriaBuilder.equal(countRoot.get("delayedUsers"),
					request.getDelayedUsers());
			countPredicates.add(delayedUsersPredicate);
		}

		countQuery.select(criteriaBuilder.count(countRoot))
				.where(criteriaBuilder.and(countPredicates.toArray(new Predicate[0])));

		Long count = entityManager.createQuery(countQuery).getSingleResult();

		return new PageImpl<User>(users, page, count);
	}

}
