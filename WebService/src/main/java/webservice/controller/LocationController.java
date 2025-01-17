package webservice.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import webservice.domains.location.Location;
import webservice.domains.location.LocationReponse;
import webservice.entity.EmptyResponse;
import webservice.service.LocationService;

@RestController
@RequestMapping("locations")
@AllArgsConstructor
@Tag(name = "Locations")
public class LocationController {

	private LocationService locationService;

	@GetMapping("/{id}")
	public ResponseEntity<Location> getLocationPorId(@PathVariable String id) {
		return locationService.getLocationPorId(id);
	}

	@GetMapping
	public Page<Location> getLocationAll(@RequestParam(required = false) Integer floor,
			@RequestParam(required = false) String section, @RequestParam(required = false) Integer bookcase,
			@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "5") Integer pageSize) {

		if (floor != null || section != null || bookcase != null) {
			return locationService.locationFilter(floor, section, bookcase,
					PageRequest.of(page, pageSize, Sort.by(Sort.Direction.ASC, "section")));
		} else {
			return locationService.getLocationAll(PageRequest.of(page, pageSize, Sort.by(Sort.Direction.ASC, "section")));
		}
	}
	
	@GetMapping("/find-list")
	public List<Location> getLocationFindList() {
		return locationService.getLocationAllFindList();
	}

	@PostMapping
	public ResponseEntity<EmptyResponse> postLocation(@RequestBody LocationReponse location) {
		return locationService.postLocation(location);
	}

	@PutMapping("/{id}")
	public ResponseEntity<EmptyResponse> putLocation(@PathVariable String id, @RequestBody LocationReponse location) {
		return locationService.putLocation(id, location);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<EmptyResponse> removeLocation(@PathVariable String id) {
		return locationService.removeLocation(id);
	}

}
