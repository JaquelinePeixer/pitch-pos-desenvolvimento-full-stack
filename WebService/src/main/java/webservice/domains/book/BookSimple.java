package webservice.domains.book;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookSimple {

	private String id;

	private String title;
	
	public BookSimple(Book book) {
        this.id = book.getId();
        this.title = book.getTitle();
    }
}
