package controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import service.SubjectService;
import service.UserService;

@RestController
@RequestMapping("subjects")
@AllArgsConstructor
public class SubjectController {

	private SubjectService subjectService;
	
}
