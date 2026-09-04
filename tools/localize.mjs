import { readFileSync, writeFileSync } from 'node:fs';

const source = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

const common = {
  en: [
    ['lang="de"', 'lang="en"'],
    ['Das Charlies in Murnau am Staffelsee – Caffè, Bar und Osteria von morgens bis abends.', 'Das Charlies in Murnau am Staffelsee – café, bar and osteria from morning until night.'],
    ['Das Charlies — Caffè · Bar · Osteria in Murnau', 'Das Charlies — Café · Bar · Osteria in Murnau'],
    ['aria-current="page">DE', '>DE'], ['href="en.html">EN', 'href="en.html" aria-current="page">EN'],
    ['aria-label="Hauptnavigation"', 'aria-label="Main navigation"'], ['aria-label="Mobile Navigation"', 'aria-label="Mobile navigation"'],
    ['aria-label="Sprache"', 'aria-label="Language"'], ['aria-label="Menü öffnen"', 'aria-label="Open menu"'],
    ['Vom ersten Espresso bis zum letzten Glas. Italienische Leichtigkeit mitten im Untermarkt.', 'From the first espresso to the last glass. Italian ease in the heart of Murnau.'],
    ['Ein heller Start am Morgen, ein unkomplizierter Lunch und warmes Licht am Abend. Das Charlies verbindet die Leichtigkeit eines Caffès mit der Küche einer Osteria und der Wärme einer guten Bar.', 'A bright start in the morning, an easy lunch and warm light in the evening. Das Charlies brings together the lightness of a café, the cooking of an osteria and the warmth of a good bar.'],
    ['Namensgeber ist Charlie, ein British-Kurzhaar-Kater – gelassen, eigenständig und am liebsten dort, wo es gemütlich ist.', 'Charlie, a British Shorthair cat, gave the place its name – calm, independent and always where it feels comfortable.'],
    ['Morgens Café.<em>Abends Bar.</em>Dazwischen Murnau.', 'Morning café.<em>Evening bar.</em>Murnau in between.'],
    ['Kaffee, Croissants und warme Frühstücksteller. Ein ruhiger Anfang, bevor der Untermarkt richtig wach wird.', 'Coffee, croissants and warm breakfast plates. A quiet start before the Untermarkt truly wakes up.'],
    ['Ein zweiter Kaffee, etwas Herzhaftes und kein Grund aufzustehen. So darf ein Vormittag in Murnau bleiben.', 'A second coffee, something savoury and no reason to leave. This is how a morning in Murnau should feel.'],
    ['Pasta, Salate und ein Mittagessen, das klar und unkompliziert bleibt – mit guten Produkten und ohne schwere Inszenierung.', 'Pasta, salads and a lunch that stays simple – with good produce and no unnecessary fuss.'],
    ['Spritz, Wein und kleine Teller. Das Licht wird wärmer, die Gespräche länger und der Übergang in den Abend selbstverständlich.', 'Spritz, wine and small plates. The light grows warmer, conversations longer and evening arrives naturally.'],
    ['Dinner, Drinks und besondere Abende. Die Bar wird zum Mittelpunkt, ohne dass das Charlies seine ruhige Eleganz verliert.', 'Dinner, drinks and special nights. The bar takes centre stage without losing the quiet elegance of Charlies.'],
    ['Frühstück, Lunch, Kaffee und hausgemachte Kleinigkeiten bis hin zu Aperitivo und Dinner. Eine kleine Auswahl – die vollständige Karte gibt es als PDF.', 'Breakfast, lunch, coffee and homemade treats through to aperitivo and dinner. A small selection – the complete menu is available as a PDF.'],
    ['Reservierungen laufen direkt über Telefon oder WhatsApp. Kein Formular, kein externer Buchungsdienst.', 'Reservations are handled directly by phone or WhatsApp. No form, no external booking service.'],
    ['Dein Tag.<span>Dein Abend.</span>', 'Your day.<span>Your evening.</span>'], ['Tisch&nbsp;reservieren', 'Reserve&nbsp;a&nbsp;table'], ['Reservieren', 'Reserve'],
    ['Scrollen · Der Tag beginnt', 'Scroll · The day begins'], ['Der Tag', 'The day'], ['Speisekarte', 'Menu'], ['Galerie', 'Gallery'], ['Besuch', 'Visit'],
    ['08:00 · Frühstück', '08:00 · Breakfast'], ['10:30 · Brunch', '10:30 · Brunch'], ['12:30 · Lunch', '12:30 · Lunch'], ['18:00 · Aperitivo', '18:00 · Aperitivo'], ['Ab 20:00 · Dinner &amp; Bar', 'From 20:00 · Dinner &amp; Bar'],
    ['Früh.', 'Early.'], ['Langsam.', 'Slow.'], ['Mittag.', 'Lunch.'], ['Gold.', 'Golden.'], ['Nacht.', 'Night.'],
    ['Aus der Küche', 'From the kitchen'], ['Einfach gut essen.', 'Simply good food.'], ['Aperitivo &amp; Abend', 'Aperitivo &amp; evening'],
    ['Charlies Frühstück', 'Charlies Breakfast'], ['Sauerteigbrot, Rührei, Burrata, Avocado, Blattsalat', 'Sourdough, scrambled eggs, burrata, avocado, leaf salad'],
    ['Croissant &amp; Konfitüre', 'Croissant &amp; Preserve'], ['Buttercroissant, hausgemachte Konfitüre, Butter', 'Butter croissant, house preserve, butter'],
    ['Joghurt &amp; Granola', 'Yoghurt &amp; Granola'], ['Naturjoghurt, Granola, saisonales Obst', 'Natural yoghurt, granola, seasonal fruit'],
    ['Breite Pasta, langsam geschmortes Ragù, Burrata', 'Wide pasta, slow-cooked ragù, burrata'], ['Blattsalat, geröstetes Gemüse, Focaccia', 'Leaf salad, roasted vegetables, focaccia'], ['Tagessuppe', 'Soup of the Day'], ['Saisonale Suppe, Sauerteigbrot', 'Seasonal soup, sourdough bread'],
    ['Burrata, Prosciutto, Oliven, Gemüse, Focaccia', 'Burrata, prosciutto, olives, vegetables, focaccia'], ['Tomate, Basilikum, Olivenöl, Brot', 'Tomato, basil, olive oil, bread'],
    ['Deutsche Karte', 'German menu'], ['Im Charlies', 'Inside Charlies'], ['Ein Raum. Viele Stunden.', 'One room. Many hours.'], ['Morgens', 'Morning'], ['Kaffee', 'Coffee'],
    ['Wenn der Tag länger wird', 'When the day lasts longer'], ['Abende, die bleiben.', 'Nights to remember.'], ['Drinks &amp; kleine Teller', 'Drinks &amp; small plates'], ['Bar oder Terrasse', 'Bar or terrace'], ['Musik &amp; Bar', 'Music &amp; bar'], ['Ausgewählte DJ-Abende', 'Selected DJ nights'], ['Feiern im Charlies', 'Celebrate at Charlies'], ['Anfrage per WhatsApp', 'Enquire via WhatsApp'],
    ['Komm<em>vorbei.</em>', 'Come<em>by.</em>'], ['Adresse', 'Address'], ['Geöffnet', 'Open'], ['Mittwoch bis Sonntag', 'Wednesday to Sunday'], ['Telefon', 'Phone'], ['Anrufen', 'Call'], ['Menü', 'Menu']
  ],
  it: [
    ['lang="de"', 'lang="it"'],
    ['Das Charlies in Murnau am Staffelsee – Caffè, Bar und Osteria von morgens bis abends.', 'Das Charlies a Murnau am Staffelsee – caffè, bar e osteria dalla mattina alla sera.'],
    ['aria-current="page">DE', '>DE'], ['href="it.html">IT', 'href="it.html" aria-current="page">IT'],
    ['aria-label="Hauptnavigation"', 'aria-label="Navigazione principale"'], ['aria-label="Mobile Navigation"', 'aria-label="Navigazione mobile"'],
    ['aria-label="Sprache"', 'aria-label="Lingua"'], ['aria-label="Menü öffnen"', 'aria-label="Apri menu"'],
    ['Vom ersten Espresso bis zum letzten Glas. Italienische Leichtigkeit mitten im Untermarkt.', 'Dal primo espresso all’ultimo bicchiere. La leggerezza italiana nel cuore di Murnau.'],
    ['Ein heller Start am Morgen, ein unkomplizierter Lunch und warmes Licht am Abend. Das Charlies verbindet die Leichtigkeit eines Caffès mit der Küche einer Osteria und der Wärme einer guten Bar.', 'Una mattina luminosa, un pranzo semplice e la luce calda della sera. Das Charlies unisce la leggerezza di un caffè, la cucina di un’osteria e il calore di un buon bar.'],
    ['Namensgeber ist Charlie, ein British-Kurzhaar-Kater – gelassen, eigenständig und am liebsten dort, wo es gemütlich ist.', 'Il nome viene da Charlie, un gatto British Shorthair – tranquillo, indipendente e sempre dove si sta bene.'],
    ['Morgens Café.<em>Abends Bar.</em>Dazwischen Murnau.', 'Caffè al mattino.<em>Bar la sera.</em>Murnau nel mezzo.'],
    ['Kaffee, Croissants und warme Frühstücksteller. Ein ruhiger Anfang, bevor der Untermarkt richtig wach wird.', 'Caffè, croissant e piatti caldi per la colazione. Un inizio tranquillo prima che l’Untermarkt si svegli.'],
    ['Ein zweiter Kaffee, etwas Herzhaftes und kein Grund aufzustehen. So darf ein Vormittag in Murnau bleiben.', 'Un secondo caffè, qualcosa di salato e nessun motivo per alzarsi. Così dovrebbe essere una mattina a Murnau.'],
    ['Pasta, Salate und ein Mittagessen, das klar und unkompliziert bleibt – mit guten Produkten und ohne schwere Inszenierung.', 'Pasta, insalate e un pranzo semplice – con buoni prodotti e senza complicazioni.'],
    ['Spritz, Wein und kleine Teller. Das Licht wird wärmer, die Gespräche länger und der Übergang in den Abend selbstverständlich.', 'Spritz, vino e piccoli piatti. La luce si fa più calda, le conversazioni più lunghe e la sera arriva naturalmente.'],
    ['Dinner, Drinks und besondere Abende. Die Bar wird zum Mittelpunkt, ohne dass das Charlies seine ruhige Eleganz verliert.', 'Cena, drink e serate speciali. Il bar diventa il centro della scena senza perdere la sua eleganza tranquilla.'],
    ['Frühstück, Lunch, Kaffee und hausgemachte Kleinigkeiten bis hin zu Aperitivo und Dinner. Eine kleine Auswahl – die vollständige Karte gibt es als PDF.', 'Colazione, pranzo, caffè e specialità fatte in casa fino all’aperitivo e alla cena. Una piccola selezione – il menu completo è disponibile in PDF.'],
    ['Reservierungen laufen direkt über Telefon oder WhatsApp. Kein Formular, kein externer Buchungsdienst.', 'Le prenotazioni si fanno direttamente per telefono o WhatsApp. Nessun modulo, nessun servizio esterno.'],
    ['Dein Tag.<span>Dein Abend.</span>', 'Il tuo giorno.<span>La tua sera.</span>'], ['Tisch&nbsp;reservieren', 'Prenota&nbsp;un&nbsp;tavolo'], ['Reservieren', 'Prenota'],
    ['Scrollen · Der Tag beginnt', 'Scorri · Inizia il giorno'], ['Der Tag', 'La giornata'], ['Speisekarte', 'Menu'], ['Galerie', 'Galleria'], ['Besuch', 'Vieni a trovarci'],
    ['08:00 · Frühstück', '08:00 · Colazione'], ['Ab 20:00 · Dinner &amp; Bar', 'Dalle 20:00 · Cena &amp; Bar'], ['Früh.', 'Presto.'], ['Langsam.', 'Piano.'], ['Mittag.', 'Pranzo.'], ['Gold.', 'Oro.'], ['Nacht.', 'Notte.'],
    ['Aus der Küche', 'Dalla cucina'], ['Einfach gut essen.', 'Semplicemente buono.'], ['Frühstück', 'Colazione'], ['Aperitivo &amp; Abend', 'Aperitivo &amp; sera'],
    ['Charlies Frühstück', 'Colazione Charlies'], ['Sauerteigbrot, Rührei, Burrata, Avocado, Blattsalat', 'Pane a lievitazione naturale, uova strapazzate, burrata, avocado, insalata'],
    ['Croissant &amp; Konfitüre', 'Croissant &amp; Confettura'], ['Buttercroissant, hausgemachte Konfitüre, Butter', 'Croissant al burro, confettura della casa, burro'],
    ['Joghurt &amp; Granola', 'Yogurt &amp; Granola'], ['Naturjoghurt, Granola, saisonales Obst', 'Yogurt naturale, granola, frutta di stagione'],
    ['Breite Pasta, langsam geschmortes Ragù, Burrata', 'Pasta larga, ragù cotto lentamente, burrata'], ['Blattsalat, geröstetes Gemüse, Focaccia', 'Insalata, verdure arrosto, focaccia'], ['Tagessuppe', 'Zuppa del giorno'], ['Saisonale Suppe, Sauerteigbrot', 'Zuppa stagionale, pane a lievitazione naturale'],
    ['Burrata, Prosciutto, Oliven, Gemüse, Focaccia', 'Burrata, prosciutto, olive, verdure, focaccia'], ['Tomate, Basilikum, Olivenöl, Brot', 'Pomodoro, basilico, olio d’oliva, pane'],
    ['Deutsche Karte', 'Menu tedesco'], ['Im Charlies', 'Nel Charlies'], ['Ein Raum. Viele Stunden.', 'Un luogo. Tante ore.'], ['Morgens', 'Mattina'], ['Kaffee', 'Caffè'],
    ['Wenn der Tag länger wird', 'Quando il giorno si allunga'], ['Abende, die bleiben.', 'Serate da ricordare.'], ['Drinks &amp; kleine Teller', 'Drink &amp; piccoli piatti'], ['Bar oder Terrasse', 'Bar o terrazza'], ['Musik &amp; Bar', 'Musica &amp; bar'], ['Ausgewählte DJ-Abende', 'Serate DJ selezionate'], ['Feiern im Charlies', 'Festeggia al Charlies'], ['Anfrage per WhatsApp', 'Richiedi su WhatsApp'],
    ['Komm<em>vorbei.</em>', 'Vieni<em>da noi.</em>'], ['Adresse', 'Indirizzo'], ['Geöffnet', 'Aperto'], ['Mittwoch bis Sonntag', 'Da mercoledì a domenica'], ['Telefon', 'Telefono'], ['Anrufen', 'Chiama'], ['Route', 'Indicazioni'], ['Menü', 'Menu']
  ]
};

for (const [language, replacements] of Object.entries(common)) {
  let output = source;
  for (const [from, to] of replacements) output = output.replaceAll(from, to);
  writeFileSync(new URL(`../${language}.html`, import.meta.url), output);
}
