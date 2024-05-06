package controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import service.LocationService;

@RestController
@RequestMapping("locations")
@AllArgsConstructor
public class LocationController {

	private LocationService locationService;
}
