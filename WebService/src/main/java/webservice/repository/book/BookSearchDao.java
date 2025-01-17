package webservice.repository.book;

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
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import webservice.domains.book.Book;
import webservice.domains.book.BookSearch;
import webservice.entity.Author;
import webservice.entity.Subject;

@Repository
@RequiredArgsConstructor
public class BookSearchDao {

	private final EntityManager entityManager;

	public Page<Book> findAllByCriteria(BookSearch request, Pageable page) {

		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Book> criteriaQuery = criteriaBuilder.createQuery(Book.class);

		List<Predicate> predicates = new ArrayList<>();

		Root<Book> root = criteriaQuery.from(Book.class);
		
		if (request.getAuthor() != null) {
			Join<Book, Author> authorJoin = root.join("author");
			Predicate authorPredicate = criteriaBuilder.like(authorJoin.get("name"), "%" + request.getAuthor() + "%");
			predicates.add(authorPredicate);
		}

		if (request.getTitle() != null) {
			Predicate titlePredicate = criteriaBuilder.like(root.get("title"), "%" + request.getTitle() + "%");
			predicates.add(titlePredicate);
		}

		if (request.getSubject() != null) {			
			Join<Book, Subject> subjectJoin = root.join("subject");
			Predicate subjectPredicate = criteriaBuilder.like(subjectJoin.get("name"), "%" + request.getSubject() + "%");
			predicates.add(subjectPredicate);
		}

		if (!predicates.isEmpty()) {
			criteriaQuery.where(criteriaBuilder.and(predicates.toArray(new Predicate[0])));
		}

		TypedQuery<Book> query = entityManager.createQuery(criteriaQuery);		
	
		query.setFirstResult((int) page.getOffset());
		query.setMaxResults(page.getPageSize());
		
		List<Book> books = query.getResultList();

		CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);

		Root<Book> countRoot = countQuery.from(Book.class);		
		
		List<Predicate> countPredicates = new ArrayList<>();
		
		if (request.getAuthor() != null) {
			Join<Book, Author> authorJoin = countRoot.join("author");
			Predicate authorPredicate = criteriaBuilder.like(authorJoin.get("name"), "%" + request.getAuthor() + "%");
			countPredicates.add(authorPredicate);
		}

		if (request.getTitle() != null) {
			Predicate titlePredicate = criteriaBuilder.like(countRoot.get("title"), "%" + request.getTitle() + "%");
			countPredicates.add(titlePredicate);
		}

		if (request.getSubject() != null) {
			Join<Book, Subject> subjectJoin = countRoot.join("subject");
			Predicate subjectPredicate = criteriaBuilder.like(subjectJoin.get("name"), "%" + request.getSubject() + "%");
			countPredicates.add(subjectPredicate);
		}

		countQuery.select(criteriaBuilder.count(countRoot))
				.where(criteriaBuilder.and(countPredicates.toArray(new Predicate[0])));
		
		Long count = entityManager.createQuery(countQuery).getSingleResult();
		
		return new PageImpl<Book>(books, page, count);
	}

}
