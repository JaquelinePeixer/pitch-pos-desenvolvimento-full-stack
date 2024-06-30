package webservice.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import webservice.entity.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long>, CrudRepository<Location, Long> {
	
    @Query(value="SELECT * FROM location l WHERE (:floor is null or l.floor LIKE %:floor%)" 
            + " AND (:section is null or l.section LIKE %:section%)"
            + " AND (:bookcase is null or l.bookcase LIKE %:bookcase%)", nativeQuery=true)
    public Page<Location> search(@Param("floor")Integer floor, @Param("section")String section, @Param("bookcase")Integer bookcase, Pageable page);
}
