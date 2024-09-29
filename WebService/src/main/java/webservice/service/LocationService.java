package webservice.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMethod;

import lombok.AllArgsConstructor;
import webservice.domains.location.Location;
import webservice.domains.location.LocationReponse;
import webservice.entity.EmptyResponse;
import webservice.entity.ResponseModel;
import webservice.repository.LocationRepository;

@AllArgsConstructor
@Service
public class LocationService {

	private LocationRepository locationRepository;

	public ResponseEntity<Location> getLocationPorId(String id) {
		if (locationRepository.existsById(id)) {
			return ResponseEntity.status(HttpStatus.OK).body(locationRepository.findById(id).get());
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	public Page<Location> getLocationAll(PageRequest page) {
		return locationRepository.findAll(page);
	}

	public Page<Location> locationFilter(Integer floor, String section, Integer bookcase, PageRequest page) {
		return locationRepository.search(floor, section, bookcase, page);
	}

	public ResponseEntity<EmptyResponse> postLocation(LocationReponse location) {
		 saveLocation(location, RequestMethod.POST);
		return ResponseEntity.status(HttpStatus.OK).body(new EmptyResponse("Localização criada com sucesso"));
	}

	public ResponseEntity<EmptyResponse> putLocation(String id, LocationReponse location) {
		if (locationRepository.existsById(id)) {
			Location newLocation = new Location(location.getId(), location.getFloor(), location.getSection(),
					location.getInitialBookcase());
			locationRepository.save(newLocation);
			return ResponseEntity.status(HttpStatus.OK).body(new EmptyResponse("Localização salvo com sucesso!"));
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new EmptyResponse("Localização não encontrado"));
	}

	public ResponseModel saveLocation(LocationReponse location, RequestMethod method) {
		Integer finalBookcase = location.getFinalBookcase();
		Integer initialBookcase = location.getInitialBookcase();

		if (finalBookcase == null) {
			Location newLocation = new Location();
			newLocation.setFloor(location.getFloor());
			newLocation.setSection(location.getSection());
			newLocation.setBookcase(initialBookcase);
			Location locationSave = locationRepository.save(newLocation);

			if (locationSave != null) {
				if (method == RequestMethod.POST) {
					return new ResponseModel(1, "Localização criada com sucesso");
				}
				if (method == RequestMethod.PUT) {
					return new ResponseModel(1, "Localização atualizada");
				}
			}
		}

		if (finalBookcase > 0) {
			for (int i = initialBookcase; i <= finalBookcase; i++) {
				Location newLocation = new Location();
				newLocation.setFloor(location.getFloor());
				newLocation.setSection(location.getSection());
				newLocation.setBookcase(i);
				locationRepository.save(newLocation);

				if (i == finalBookcase) {
					if (method == RequestMethod.POST) {
						return new ResponseModel(1, "Localização criada com sucesso");
					}
					if (method == RequestMethod.PUT) {
						return new ResponseModel(1, "Localização atualizada");
					}
				}
			}
		}
		return new ResponseModel(2, "Não foi possivel salvar a localização");
	}

	public ResponseEntity<EmptyResponse> removeLocation(String id) {
		if (locationRepository.existsById(id)) {
			locationRepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).body(new EmptyResponse("Localização removida com sucesso"));
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new EmptyResponse("Localização não encontrada"));
	}

}
