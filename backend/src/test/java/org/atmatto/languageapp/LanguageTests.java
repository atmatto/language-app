package org.atmatto.languageapp;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.atmatto.languageapp.language.LanguageResponse;
import org.atmatto.languageapp.language.LanguageRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.assertj.MockMvcTester;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class LanguageTests {
	@Autowired
	private MockMvcTester mvc;
	@Autowired
	private ObjectMapper om;

	@Test
	void testPatchNonexistent() throws Exception {
		assertThat(
			mvc.patch()
				.uri("/api/v1/language/123456789")
				.contentType(MediaType.APPLICATION_JSON)
				.content(om.writeValueAsString(new LanguageRequest("en5", "English", "ENICON")))
		).hasStatus(HttpStatus.NOT_FOUND).bodyText().isNotBlank().satisfies(System.out::println);
	}

	@Test
	void testPatch() throws Exception {
		LanguageRequest ls = new LanguageRequest("en1", "English", "EN_ICON");
		LanguageRequest mod = new LanguageRequest(null, null, "NEW_ICON");
		assertThat(
			mvc.post()
				.uri("/api/v1/language")
				.contentType(MediaType.APPLICATION_JSON)
				.content(om.writeValueAsString(ls))
		).hasStatusOk()
			.bodyJson()
			.convertTo(LanguageResponse.class)
			.satisfies(ld -> {
				assertThat(
					mvc.patch()
						.uri("/api/v1/language/{id}", ld.id())
						.contentType(MediaType.APPLICATION_JSON)
						.content(om.writeValueAsString(mod))
				).hasStatusOk();
				assertThat(
					mvc.get()
						.uri("/api/v1/language/{id}", ld.id())
				).hasStatusOk()
					.bodyJson()
					.convertTo(LanguageResponse.class)
					.satisfies(ld2 -> {
						assertThat(ld2.id()).isEqualTo(ld.id());
						assertThat(ld2.code()).isEqualTo(ld.code());
						assertThat(ld2.name()).isEqualTo(ld.name());
						assertThat(ld2.icon()).isEqualTo(mod.icon());
					});
			});
	}

	@Test
	void testPutNonexistent() throws Exception {
		assertThat(
			mvc.put()
				.uri("/api/v1/language/123456789")
				.contentType(MediaType.APPLICATION_JSON)
				.content(om.writeValueAsString(new LanguageRequest("en4", "English", "ENICON")))
		).hasStatus(HttpStatus.NOT_FOUND).bodyText().isNotBlank().satisfies(System.out::println);
	}

	@Test
	void testPut() throws Exception {
		LanguageRequest ls = new LanguageRequest("en2", "English", "EN_ICON");
		LanguageRequest mod = new LanguageRequest("en2", "English", "NEW_ICON");
		assertThat(
			mvc.post()
				.uri("/api/v1/language")
				.contentType(MediaType.APPLICATION_JSON)
				.content(om.writeValueAsString(ls))
		).hasStatusOk()
			.bodyJson()
			.convertTo(LanguageResponse.class)
			.satisfies(ld -> {
				assertThat(
					mvc.put()
						.uri("/api/v1/language/{id}", ld.id())
						.contentType(MediaType.APPLICATION_JSON)
						.content(om.writeValueAsString(mod))
				).hasStatusOk();
				assertThat(
					mvc.get()
						.uri("/api/v1/language/{id}", ld.id())
				).hasStatusOk()
					.bodyJson()
					.convertTo(LanguageResponse.class)
					.satisfies(ld2 -> {
						assertThat(ld2.id()).isEqualTo(ld.id());
						assertThat(ld2.code()).isEqualTo(ld.code());
						assertThat(ld2.name()).isEqualTo(ld.name());
						assertThat(ld2.icon()).isEqualTo(mod.icon());
					});
			});
	}

	@Test
	void testPostWithNull() throws Exception {
		LanguageRequest ls = new LanguageRequest("en3", null, "EN_ICON");
		assertThat(
			mvc.post()
				.uri("/api/v1/language")
				.contentType(MediaType.APPLICATION_JSON)
				.content(om.writeValueAsString(ls))
		).hasStatus(HttpStatus.BAD_REQUEST).bodyText().isNotBlank().satisfies(System.out::println);
	}

	@Test
	void testPostWrongType() throws Exception {
		LanguageResponse /* should be LanguageRequest */ ls = new LanguageResponse(12L, "en6", "English", "EN_ICON");
		assertThat(
			mvc.post()
				.uri("/api/v1/language")
				.contentType(MediaType.APPLICATION_JSON)
				.content(om.writeValueAsString(ls))
		).hasStatus(HttpStatus.BAD_REQUEST).bodyText().isNotBlank().satisfies(System.out::println);
	}

	@Test
	void testDeleteNonexistent() {
		assertThat(mvc.delete().uri("/api/v1/language/123456789"))
			.hasStatus(HttpStatus.NOT_FOUND)
			.bodyText().isNotBlank().satisfies(System.out::println);
	}

	// TODO: Test deleting a language with references to it
}
