# HeroDex

HeroDex é uma aplicação front-end desenvolvida em Next.js com TypeScript, que permite a busca e visualização de informações sobre personagens de quadrinhos da API da Marvel. O projeto foi criado para fornecer uma interface simples e intuitiva para pesquisar heróis e vilões, além de exibir suas descrições.

## Funcionalidades

- **Busca de Personagens**: Pesquise heróis e vilões da Marvel por nome.
- **Filtragem Avançada**: Filtre os resultados da busca com base na quantidade de quadrinhos em que o personagem aparece e em suas aparições em séries.
- **Visualização de Detalhes**: Exiba a descrição detalhada de cada personagem.
- **Interface Simples e Responsiva**: Navegação focada na simplicidade e intuitiva para uma melhor experiência do usuário.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização no lado do servidor e geração de sites estáticos.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **API da Marvel**: Fonte de dados para informações sobre os personagens.

### Deploy

- **Vercel**: Plataforma de deploy utilizada para hospedar a aplicação: https://herodex-flame.vercel.app/ 


### Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn

### Passos para Executar Localmente

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/w-felipe360/herodex.git

2. **Obtenha as chaves da API:**
    É mandatório ter uma conta na Disney para fazer login no sit da marvel e obter as chaves
    https://developer.marvel.com/account

3. **Crie e configure o arquivo .env na raiz do projeto**
    Deixei um arquivo .env.example para referência

O arquivo .env deve seguir esta estrutura:
```env
PUBLIC_KEY=chavepública
PRIVATE_KEY=chaveprivada
```
4. **Instale as dependências:**
```bash
   npm install
   # ou
   yarn install
```
5. **Execute a aplicação**
```bash
    npm run dev
```
## Prints do projeto:

### Tela Inicial
A tela inicial permite que os usuários pesquisem personagens da Marvel por nome. A interface é simples e intuitiva, facilitando a navegação.

<img src="https://raw.githubusercontent.com/w-felipe360/images/main/img1.png" alt="Tela Inicial" style="max-width: 100%; height: auto;">

### Tela de Detalhes
A tela de detalhes exibe informações detalhadas sobre um personagem selecionado, incluindo sua descrição e aparições em quadrinhos e séries.

<img src="https://raw.githubusercontent.com/w-felipe360/images/main/img2.png" alt="Tela de detalhes" style="max-width: 100%; height: auto;">

### Tela de Filtros
A tela de filtros permite que os usuários refinem suas buscas com base em critérios específicos, como a quantidade de quadrinhos e séries em que o personagem aparece.

<img src="https://raw.githubusercontent.com/w-felipe360/images/main/img3.png" alt="Tela de filtros" style="max-width: 100%; height: auto;">
