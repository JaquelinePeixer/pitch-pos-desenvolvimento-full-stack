package webservice.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
import webservice.entity.Location;
import webservice.entity.LocationReponse;
import webservice.entity.ResponseModel;
import webservice.service.LocationService;

@RestController
@RequestMapping("locations")
@AllArgsConstructor
@Tag(name = "Locations")
public class LocationController {

	private LocationService locationService;

	@GetMapping("/{id}")
	public ResponseEntity<Location> getLocationPorId(@PathVariable Long id) {
		return locationService.getLocationPorId(id);
	}

	@GetMapping
	public Page<Location> getAuthorAll(@RequestParam(required = false) Integer floor,
			@RequestParam(required = false) String section, @RequestParam(required = false) Integer bookcase,
			@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "5") Integer pageSize) {

		if (floor != null || section != null || bookcase != null) {
			return locationService.locationFilter(floor, section, bookcase, PageRequest.of(page, pageSize));
		} else {
			return locationService.getLocationAll(PageRequest.of(page, pageSize));
		}
	}

	@PostMapping
	public ResponseEntity<ResponseModel> postLocation(@RequestBody LocationReponse location) {
		return locationService.postLocation(location);
	}

	@PutMapping("/{id}")
	public ResponseEntity<ResponseModel> putLocation(@PathVariable Long id, @RequestBody LocationReponse location) {
		return locationService.putLocation(id, location);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseModel> removeLocation(@PathVariable Long id) {
		return locationService.removeLocation(id);
	}

}
