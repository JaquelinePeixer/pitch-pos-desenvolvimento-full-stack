package webservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import webservice.entity.Location;
import webservice.service.LocationService;

@RestController
@RequestMapping("locations")
@AllArgsConstructor
public class LocationController {

	private LocationService locationService;

	@GetMapping("/{id}")
	public ResponseEntity<Location> getLocationPorId(@PathVariable Long id) {
		return locationService.getLocationPorId(id);
	}

	@GetMapping
	public List<Location> getLocationAll() {
		return locationService.getLocationAll();
	}

	@PostMapping
	public ResponseEntity<Location> postLocation(@RequestBody Location location) {
		return locationService.postLocation(location);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Location> putLocation(@PathVariable Long id, @RequestBody Location location) {
		return locationService.putLocation(id, location);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> removeLocation(@PathVariable Long id) {
		return locationService.removeLocation(id);
	}

}
