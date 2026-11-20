# ✈️ Roleta do Destino

Sorteio aleatório do próximo destino de férias (100 destinos, saída de Portugal).
Sorteio puro ou por tipo, com vetos, missões para o grupo e botão de partilha para WhatsApp.

Ficheiros (têm de ficar na mesma pasta):
- `index.html`: página inicial com ícones para todos os menus e o destino do dia
- `roleta.html`: a roleta (com ficha de missão, XP e passaporte)
- `duelo.html`: duelo de dois destinos com votação secreta do grupo
- `quiz.html`: quiz de geografia, individual ou em grupo
- `sugestor.html`: “Pede ao Destino”, descreve a viagem e recebe sugestões
- `sorteio-amigos.html`: modo físico: o telemóvel passa de mão em mão, cada um sugere em segredo e os destinos são eliminados um a um até sobrar o vencedor
- `mapa.html`: o avião parte de Lisboa e sobrevoa o mundo até aterrar no destino sorteado (globo 3D, precisa de internet)
- `viagem.html`: painel da viagem (destino misterioso com quiz de pistas e ranking, contagem decrescente, checklist da mala, moeda ao ar)
- `missoes.js`: a missão principal de cada destino (usada na ficha de missão)
- `jogo.js`: lógica partilhada de gamificação (passaporte, XP, conquistas)
- `coords.js`: coordenadas dos 400 destinos
- `destinos.js`: os 400 destinos (nome, país, bandeira, tipo, frase, região)

Para acrescentar um destino, basta uma nova linha em `destinos.js`.

## Publicar no GitHub Pages
1. Cria um repositório e envia os 13 ficheiros para a raiz.
2. Em **Settings → Pages**, escolhe **Deploy from a branch**, ramo `main`, pasta `/ (root)`.
3. Passado um minuto, o site fica em `https://<utilizador>.github.io/<repositorio>/`.
4. Partilha esse link no grupo de WhatsApp.
