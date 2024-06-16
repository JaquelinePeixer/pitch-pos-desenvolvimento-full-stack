package webservice.config;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;

public class SwaggerConfig {
	@Bean
	public GroupedOpenApi controllerApi() {
		return GroupedOpenApi.builder()
				.group("controller-api")
				.packagesToScan("webservice.controller")
				.build();
	}
}
