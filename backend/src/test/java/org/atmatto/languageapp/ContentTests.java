package org.atmatto.languageapp;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.atmatto.languageapp.content.ContentRequest;
import org.atmatto.languageapp.content.Provenance;
import org.atmatto.languageapp.language.LanguageRequest;
import org.atmatto.languageapp.language.LanguageResponse;
import org.atmatto.languageapp.sentence.SentenceResponse;
import org.atmatto.languageapp.sentence.SentenceResponseShallow;
import org.atmatto.languageapp.word.WordRequest;
import org.atmatto.languageapp.word.WordResponse;
import org.atmatto.languageapp.word.WordResponseShallow;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.assertj.MockMvcTester;
import org.springframework.test.web.servlet.assertj.MvcTestResult;

import java.util.Objects;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class ContentTests {
	@Autowired
	private MockMvcTester mvc;
	@Autowired
	private ObjectMapper om;

	private Long prepareLanguage() throws Exception {
		LanguageResponse lr = om.readValue(mvc.post()
			.uri("/api/v1/language")
			.contentType(MediaType.APPLICATION_JSON)
			.content(om.writeValueAsString(new LanguageRequest("en1", "English", "EN_ICON")))
			.exchange()
			.getResponse()
			.getContentAsString(), LanguageResponse.class);
		return lr.id();
	}

	@Test
	public void testWord() throws Exception {
		Long lang = prepareLanguage();

		MvcTestResult post = mvc.post()
			.uri("/api/v1/word")
			.contentType(MediaType.APPLICATION_JSON)
			.content("{\"language\": " + lang + ", \"provenance\": \"MANUAL\", \"text\": \"test\"}")
			.exchange();
		assertThat(post).hasStatusOk();
		WordResponse postResp = om.readValue(post.getResponse().getContentAsString(), WordResponse.class);

		MvcTestResult put = mvc.put()
			.uri("/api/v1/word/{id}", postResp.contentResponse().id())
			.contentType(MediaType.APPLICATION_JSON)
			.content("{\"language\": " + lang + ", \"provenance\": \"MANUAL\", \"text\": \"test2\"}")
			.exchange();
		assertThat(put).hasStatusOk();
		WordResponse putResp = om.readValue(put.getResponse().getContentAsString(), WordResponse.class);
		assertThat(putResp.contentResponse().text()).isEqualTo("test2");

		MvcTestResult patch = mvc.patch()
			.uri("/api/v1/word/{id}", postResp.contentResponse().id())
			.contentType(MediaType.APPLICATION_JSON)
			.content("{\"provenance\": \"BATCH\"}")
			.exchange();
		assertThat(patch).hasStatusOk();
		WordResponse patchResp = om.readValue(patch.getResponse().getContentAsString(), WordResponse.class);
		assertThat(patchResp.contentResponse().provenance()).isEqualTo(Provenance.BATCH);

		MvcTestResult get = mvc.get()
			.uri("/api/v1/word/{id}", postResp.contentResponse().id())
			.exchange();
		assertThat(get).hasStatusOk();
		WordResponse getResp = om.readValue(get.getResponse().getContentAsString(), WordResponse.class);
		assertThat(getResp.contentResponse().provenance()).isEqualTo(Provenance.BATCH);

		MvcTestResult delete = mvc.delete()
			.uri("/api/v1/word/{id}", postResp.contentResponse().id())
			.exchange();
		assertThat(delete).hasStatus(HttpStatus.NO_CONTENT);

		MvcTestResult getAll = mvc.get()
			.uri("/api/v1/word")
			.exchange();
		assertThat(getAll).hasStatusOk();
		WordResponse[] getAllResp = om.readValue(getAll.getResponse().getContentAsString(), WordResponse[].class);
		assertThat(getAllResp).isEmpty();
	}

	@Test
	public void testSentence() throws Exception {
		Long lang = prepareLanguage();

		MvcTestResult post = mvc.post()
			.uri("/api/v1/sentence")
			.contentType(MediaType.APPLICATION_JSON)
			.content("{\"language\": " + lang + ", \"provenance\": \"MANUAL\", \"text\": \"test\"}")
			.exchange();
		assertThat(post).hasStatusOk();
		SentenceResponse postResp = om.readValue(post.getResponse().getContentAsString(), SentenceResponse.class);

		MvcTestResult put = mvc.put()
			.uri("/api/v1/sentence/{id}", postResp.contentResponse().id())
			.contentType(MediaType.APPLICATION_JSON)
			.content("{\"language\": " + lang + ", \"provenance\": \"MANUAL\", \"text\": \"test2\"}")
			.exchange();
		assertThat(put).hasStatusOk();
		SentenceResponse putResp = om.readValue(put.getResponse().getContentAsString(), SentenceResponse.class);
		assertThat(putResp.contentResponse().text()).isEqualTo("test2");

		MvcTestResult patch = mvc.patch()
			.uri("/api/v1/sentence/{id}", postResp.contentResponse().id())
			.contentType(MediaType.APPLICATION_JSON)
			.content("{\"provenance\": \"BATCH\"}")
			.exchange();
		assertThat(patch).hasStatusOk();
		SentenceResponse patchResp = om.readValue(patch.getResponse().getContentAsString(), SentenceResponse.class);
		assertThat(patchResp.contentResponse().provenance()).isEqualTo(Provenance.BATCH);

		MvcTestResult get = mvc.get()
			.uri("/api/v1/sentence/{id}", postResp.contentResponse().id())
			.exchange();
		assertThat(get).hasStatusOk();
		SentenceResponse getResp = om.readValue(get.getResponse().getContentAsString(), SentenceResponse.class);
		assertThat(getResp.contentResponse().provenance()).isEqualTo(Provenance.BATCH);

		MvcTestResult delete = mvc.delete()
			.uri("/api/v1/sentence/{id}", postResp.contentResponse().id())
			.exchange();
		assertThat(delete).hasStatus(HttpStatus.NO_CONTENT);

		MvcTestResult getAll = mvc.get()
			.uri("/api/v1/sentence")
			.exchange();
		assertThat(getAll).hasStatusOk();
		SentenceResponse[] getAllResp = om.readValue(getAll.getResponse().getContentAsString(), SentenceResponse[].class);
		assertThat(getAllResp).isEmpty();
	}

	@Test
	public void testWordAndSentence() throws Exception {
		Long lang = prepareLanguage();

		MvcTestResult postWord = mvc.post()
			.uri("/api/v1/word")
			.contentType(MediaType.APPLICATION_JSON)
			.content("{\"language\": " + lang + ", \"provenance\": \"MANUAL\", \"text\": \"test\"}")
			.exchange();
		assertThat(postWord).hasStatusOk();
		WordResponse postWordResp = om.readValue(postWord.getResponse().getContentAsString(), WordResponse.class);

		MvcTestResult postSentence = mvc.post()
			.uri("/api/v1/sentence")
			.contentType(MediaType.APPLICATION_JSON)
			.content("{\"language\": " + lang + ", \"provenance\": \"MANUAL\", \"text\": \"Test sentence.\"}")
			.exchange();
		assertThat(postSentence).hasStatusOk();
		SentenceResponse postSentenceResp = om.readValue(postSentence.getResponse().getContentAsString(), SentenceResponse.class);

		MvcTestResult patchManyToManyOwning = mvc.patch()
			.uri("/api/v1/sentence/{id}", postSentenceResp.contentResponse().id())
			.contentType(MediaType.APPLICATION_JSON)
			.content("{\"words\": [" + postWordResp.contentResponse().id() + "]}")
			.exchange();
		assertThat(patchManyToManyOwning).hasStatusOk();
		SentenceResponse patchManyToManyOwningResp = om.readValue(patchManyToManyOwning.getResponse().getContentAsString(), SentenceResponse.class);
		assertThat(patchManyToManyOwningResp.words())
//			.filteredOn(w -> Objects.equals(w.contentResponse().id(), postWordResp.contentResponse().id()))
			.singleElement()
			.matches(w -> Objects.equals(w.contentResponse().id(), postWordResp.contentResponse().id()))
			.extracting(WordResponseShallow::examples)
			.matches(e -> e.contains(postSentenceResp.contentResponse().id()));

		MvcTestResult patchManyToManyNonOwning = mvc.patch()
			.uri("/api/v1/word/{id}", postWordResp.contentResponse().id())
			.contentType(MediaType.APPLICATION_JSON)
			.content("{\"definitions\": [" + postSentenceResp.contentResponse().id() + "]}")
			.exchange();
		assertThat(patchManyToManyNonOwning).hasStatusOk();
		WordResponse patchManyToManyNonOwningResp = om.readValue(patchManyToManyNonOwning.getResponse().getContentAsString(), WordResponse.class);
		assertThat(patchManyToManyNonOwningResp.definitions())
//			.filteredOn(s -> Objects.equals(s.contentResponse().id(), postSentenceResp.contentResponse().id()))
			.singleElement()
			.matches(s -> Objects.equals(s.contentResponse().id(), postSentenceResp.contentResponse().id()))
			.extracting(SentenceResponseShallow::definitionOf)
			.matches(d -> d.contains(postSentenceResp.contentResponse().id()));

		MvcTestResult delete = mvc.delete()
			.uri("/api/v1/sentence/{id}", postSentenceResp.contentResponse().id())
			.exchange();
		assertThat(delete).hasStatus(HttpStatus.NO_CONTENT);
	}
}
