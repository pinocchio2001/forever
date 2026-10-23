# Pour Cloclo

Une page unique : une enveloppe scellée → la lettre → un cadenas → la photo.
HTML / CSS / JS natifs, aucune dépendance, aucun build. Pensée d'abord pour le
téléphone.

## Fichiers

| Fichier      | Rôle                                                   |
|--------------|--------------------------------------------------------|
| `index.html` | la structure et **le texte de la lettre**              |
| `styles.css` | toute la mise en forme et les animations               |
| `script.js`  | l'ouverture, les apparitions, le cadenas               |
| `pic.jpeg`   | le cadenas (1200 × 1600) — révélé après la lettre      |
| `pic2.jpeg`  | la rando (1600 × 1200) — le plein écran de fin         |
| `message.txt`| le texte d'origine (non utilisé par la page)           |

## Mettre en ligne sur GitHub Pages

```bash
git init
git add .
git commit -m "Pour Cloclo"
git branch -M main
git remote add origin https://github.com/<ton-pseudo>/<le-repo>.git
git push -u origin main
```

Puis sur GitHub : **Settings → Pages → Source : Deploy from a branch →
`main` / `/ (root)` → Save**. Au bout d'une minute, c'est en ligne sur
`https://<ton-pseudo>.github.io/<le-repo>/`.

Deux remarques :

- **Mets le dépôt en privé si tu peux** (GitHub Pages sur dépôt privé demande
  un compte Pro). Sinon, un nom de dépôt peu devinable suffit : la page porte
  déjà `<meta name="robots" content="noindex">` pour ne pas finir dans Google.
- Le nom de fichier `pic.jpeg` est sensible à la casse sur GitHub Pages
  (contrairement à Windows). Ne le renomme pas en `.jpg` sans changer aussi
  `index.html`.

## Ce que tu voudras peut-être retoucher

Tout est dans `index.html`, en clair :

- la légende de la photo (`02 · 06 · 2026 — N Seoul Tower`) et les prénoms,
- la ligne avant le cadenas : « Quelque part à Séoul, il y a une preuve. »,
- la fin : « On l'a fermé, et on a jeté la clé. » / « Pour toujours. »,
- le texte de la lettre, repris mot pour mot depuis `message.txt` (seuls les
  apostrophes droites sont devenues typographiques, et le ❤️ final est dessiné
  en SVG pour qu'il s'affiche pareil sur tous les téléphones).

Les couleurs sont regroupées tout en haut de `styles.css` (`:root`) : elles
sont tirées de la photo — le ciel du coucher de soleil, la pêche de l'horizon,
le cyan du cadenas.

## Tester en local

Ouvrir `index.html` directement dans le navigateur suffit.
