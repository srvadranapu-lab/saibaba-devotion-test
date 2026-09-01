# Sai Devotion

App Overview
Build a peaceful, simple devotional mobile-first web app called Sai Baba Devotional App. Users choose a language (English, Hindi, or Telugu), then browse Sai Satcharitra chapters or devotional songs and read the content in their selected language.
Visual style: Calm, respectful, devotional. Warm neutral background tones (cream/off-white or soft saffron), a single accent color (deep maroon, gold, or teal), generous whitespace, large legible text, no clutter. Avoid anything flashy or commercial-feeling — this should feel like a quiet reading space.
Data Architecture (build this first)
Store all content as structured, extensible data — do NOT hardcode chapter/song text directly into components. Use a shape like this so new chapters/songs can be dropped in later without touching the UI:
json
// chapters.json
{
  "chapters": [
    {
      "id": 1,
      "translations": {
        "en": {
          "title": "Chapter 1 — Sample Title",
          "body": "This is placeholder text for Chapter 1 in English. Replace with the actual Sai Satcharitra chapter content. Lorem ipsum devotional placeholder text continues here to simulate a full chapter length for scroll testing purposes."
        },
        "hi": {
          "title": "अध्याय 1 — नमूना शीर्षक",
          "body": "यह अध्याय 1 का हिंदी में नमूना पाठ है। वास्तविक साई सच्चरित्र सामग्री से बदला जाना है।"
        },
        "te": {
          "title": "అధ్యాయం 1 — నమూనా శీర్షిక",
          "body": "ఇది అధ్యాయం 1 యొక్క తెలుగులో నమూనా వచనం. వాస్తవ సాయి సచ్చరిత్ర కంటెంట్‌తో భర్తీ చేయాలి."
        }
      }
    }
    // Chapters 2–51: same shape, add as content becomes available.
    // If a translation object is missing for a language, the app must show:
    // "This content is not yet available in [Language]."
  ]
}
json
// songs.json
{
  "songs": [
    {
      "id": "sai-baba-aarti",
      "type": "universal",
      "title": "Sai Baba Aarti",
      "lyrics": "Placeholder universal lyrics — same across all languages since Aarti is traditionally sung in its original form. Replace with actual Aarti text."
    },
    {
      "id": "sai-chalisa",
      "type": "per-language",
      "translations": {
        "en": { "title": "Sai Chalisa", "lyrics": "Placeholder English lyrics for Sai Chalisa." },
        "hi": { "title": "साईं चालीसा", "lyrics": "साईं चालीसा के लिए नमूना हिंदी बोल।" },
        "te": { "title": "సాయి చాలీసా", "lyrics": "సాయి చాలీసా కోసం నమూనా తెలుగు సాహిత్యం." }
      }
    }
    // Add more songs following either the "universal" or "per-language" shape.
  ]
}
Two song types:
universal — one set of lyrics shown regardless of selected language (e.g. traditional Aarti, Marathi originals).
per-language — lyrics translated separately per language, using the same missing-translation fallback as chapters.
Screens to Build
1. Welcome / Language Selection Screen
Prominent, respectful Sai Baba image placeholder (use a simple centered image placeholder for now — real image to be swapped in later; do not use copyrighted/watermarked images).
Prompt text: "Choose Language" (translate this label itself once a language is picked elsewhere — on this screen it can stay in English since no language is selected yet).
Three large buttons: English / Hindi / Telugu.
Selecting a language stores it in app state (session) and navigates to Content Selection.
2. Content Selection Screen
Two large buttons, labels in the selected language:
"Sai Satcharitra Stories"
"Sai Devotional Songs"
Previous and Exit buttons per global nav rules below.
3. Sai Satcharitra Stories Screen
Scrollable list of chapter buttons, "Chapter 1" through "Chapter 51", labels in selected language.
Only chapters present in chapters.json need real data; render all 51 buttons regardless (missing ones show the fallback message when opened).
Selecting a chapter opens Chapter Reading Screen.
4. Chapter Reading Screen
Chapter title + number.
Full chapter text, readable typography: comfortable line height, max content width for readability, vertical scroll for long text.
If the translation is missing for the selected language: show "This content is not yet available in [Language]." instead of body text.
Previous and Exit buttons.
5. Sai Devotional Songs Screen
Scrollable list of song buttons (starting with Sai Baba Aarti, Majhe Pandarpur, Sai Chalisa — from songs.json).
Titles shown in selected language where a translation exists; universal songs show their single title.
Selecting a song opens Song Lyrics Screen.
6. Song Lyrics Screen
Song title + full lyrics, same readable formatting as Chapter Reading.
Universal songs: show lyrics as-is regardless of language.
Per-language songs: apply the same missing-translation fallback as chapters.
Previous and Exit buttons.
Global Navigation Rules
Every screen has Previous (returns to prior screen) and Exit (returns to Welcome screen / clears session — since this is a web app, treat "Exit" as returning to the Welcome screen).
The selected language must persist across all navigation until the user changes it or exits.
Usability Requirements
Buttons: large tap targets, clear labels, adequate spacing.
Text: legible size on mobile, good contrast, comfortable line spacing.
Layout stays calm and uncluttered — this is a devotional reading app, not a content-heavy dashboard.
Explicitly Out of Scope for v1
Do not build these yet — just don't make decisions now that would block adding them later:
Audio playback
Search
Bookmarks/favourites
Adjustable text size / dark mode
"Continue reading" state
Additional languages
Daily quote feature
Placeholder Content Note
All chapter and song text in this build is clearly-marked dummy placeholder content, used only to validate navigation, scrolling, and language-switching behavior. Real Sai Satcharitra chapter text and song lyrics will be supplied afterward in the same JSON structure and swapped in.

Also, I'm attaching few images that can be placed in appropriate areas with appropriate dimensions of your choice (you don't have to use exact dimensions of images I'm attaching)

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sai-devotion-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ff4d3d2a-6fc8-495d-84bd-5c9ed1903053).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
