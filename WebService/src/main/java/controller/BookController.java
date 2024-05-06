package controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import service.BookService;

@RestController
@RequestMapping("books")
@AllArgsConstructor
public class BookController {

	private BookService bookService;
}
