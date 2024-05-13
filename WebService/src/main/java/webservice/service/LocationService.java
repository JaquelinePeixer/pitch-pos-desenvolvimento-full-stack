package webservice.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import webservice.entity.Location;
import webservice.repository.LocationRepository;

@AllArgsConstructor
@Service
public class LocationService {

    private LocationRepository locationRepository;

    public ResponseEntity<Location> getLocationPorId(Long id) {
        if (locationRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.OK).body(locationRepository.findById(id).get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    public List<Location> getLocationAll() {
        return locationRepository.findAll();
    }

    public ResponseEntity<Location> postLocation(Location location) {
        Location locationSave = locationRepository.save(location);
        return ResponseEntity.status(HttpStatus.CREATED).body(locationSave);
    }

    public ResponseEntity<Location> putLocation(Long id, Location location) {
        if (locationRepository.existsById(id)) {
            Location locationSave = locationRepository.save(location);
            return ResponseEntity.status(HttpStatus.OK).body(locationSave);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    public ResponseEntity<String> removeLocation(Long id) {
        if (locationRepository.existsById(id)) {
            locationRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Success");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Location não encontrado");
    }

}
