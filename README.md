# E2E testy – exotickepalmy.sk

### Inštalácia

```bash
git clone https://github.com/BaksaVrato/e2e-kooperativa.git
cd e2e-kooperativa
npm ci
npx playwright install --with-deps chromium
```

### Spúšťanie testov

```bash
# Spustí všetky testy 
npm test

# Spustí testy v interaktívnom UI režime
npm run test:ui

# Otvorí posledný HTML report
npm run test:report
```

### CI/CD 

Testy bežia automaticky cez github actions definované v 
`.github/workflows/playwright.yml`

Pipeline sa spustí pri pushi do mainu a na pull requestoch (alebo manuálne cez workflow)

### Report

Report sa odkladá buď v GitHub repozitári pod záložkou actions alebo priamo v kóde vo foldri `playwright-report`

## Prístup, výzvy a rozhodnutia

#### Testovacie dáta
Dáta pre testy sú podľa zadania uložené v JSON súboroch. Osobne by som to takto
nevolil – radšej by som si dátové objekty otypoval a vytváral ich buď
manuálne podľa definovaných typov, alebo cez jednoduchú factory.
Preto som aj JSON dáta pri načítaní otypoval – je to prehľadnejšie a dostávam
kontrolu typov aj napovedanie v IDE.

#### Štruktúra - data a testy
Pôvodne som mal všetko v jednom `src` priečinku. Nakoniec som z neho extrahoval testy a
premenoval ho na `shared` - obsahuje len generické, znovupoužiteľné
dáta, ktoré sú použiteľné vo všetkých testoch. 
Naopak test specific veci, v tomto prípade testovacie dáta (ktoré som mal tiež v `shared` povodne), som
presunul priamo ku testom, keďže patria konkrétnemu testu. Do `shared` by
mohli ísť dáta, ktoré nie sú viazané na jeden test – v reálnom systéme napríklad
zdieľaní testovací používatelia.

#### Štruktúra – pages a komponenty
Fixtures a Page Object model sú rozdelené na pages a komponenty, čo je pri
Playwrighte bežný prístup. Chvíľu som zvažoval, či to nie je ale zbytočne
komplikované pri takomto malom projekte – jednoduchšie by bolo písať testy priamo a dopytovať sa na
selektory bez tejto štruktúry. No ak sa hráme, že framework obsahuje 
stovky testov, je takáto štruktúra viac maintainable výmenou za prvotnú efektivitu.

#### Miera decouplingu
Rozdelenie na komponenty a pages dáva prehľad, no otázka je, do akej miery
veci oddeľovať. Napríklad prácu s `ProductCard`, ktorú používam na `HomePage`,
by bolo vhodné ešte viac decouplnúť, ak sa daný komponent používa aj inde.
Aktuálne som to nechal v tomto stave – pri reálnom vývoji by sa miera decouplingu
určovala jednoduchšie, pretože by som poznal celú codebase a vedel, kde a ako sa
komponenty znovu používajú.

#### Stabilita selektorov
Zámerne používam `data-testid` namiesto CSS tried, tagov či textu. Toto bol
jeden z hlavných dovodov výberu tohoto e-shopu. 

#### Pridanie do košíka
Pridanie do košíka prebieha cez AJAX, takže priame prejdenie na stránku košíka
našlo ešte prázdny košík – požiadavka nestihla dobehnúť. Vyriešil som to 
čakaním na aktualizáciu počítadla v hlavičke. Nie je to najelegantnejšie, ale lepšie 
ako použiť timeout, ktorý sposobuje flakiness.