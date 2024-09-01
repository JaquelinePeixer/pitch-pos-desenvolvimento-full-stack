package webservice.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMethod;

import lombok.AllArgsConstructor;
import webservice.entity.Location;
import webservice.entity.LocationReponse;
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

	public ResponseEntity<ResponseModel> postLocation(LocationReponse location) {
		ResponseModel responseModel = saveLocation(location, RequestMethod.POST);
		return ResponseEntity.status(HttpStatus.CREATED).body(responseModel);
	}

	public ResponseEntity<ResponseModel> putLocation(String id, LocationReponse location) {
		if (locationRepository.existsById(id)) {
			ResponseModel responseModel = saveLocation(location, RequestMethod.PUT);
			return ResponseEntity.status(HttpStatus.OK).body(responseModel);
		}
		ResponseModel responseModelError = new ResponseModel(2, "Localização não encontrada");
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseModelError);
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

	public ResponseEntity<ResponseModel> removeLocation(String id) {
		if (locationRepository.existsById(id)) {
			locationRepository.deleteById(id);
			ResponseModel responseModel = new ResponseModel(1, "Localização removida com sucesso");
			return ResponseEntity.status(HttpStatus.OK).body(responseModel);
		}
		ResponseModel responseModelError = new ResponseModel(2, "Localização não encontrada");
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseModelError);
	}

}
