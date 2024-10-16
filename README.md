# MonoRepo com Yarn Workspaces (Do Zero Ao Heroi)

Bem-vindo ao meu guia do **Monorepo React**! Este repositório é uma solução moderna e eficiente que combina a simplicidade do **React** com a potência do **Turbo.build** e a flexibilidade do **Tailwind CSS**.

## 🛠 Tecnologias Utilizadas

- **React**: Uma biblioteca JavaScript para construir interfaces de usuário.
- **Turbo.build**: Uma ferramenta poderosa que melhora a velocidade de desenvolvimento e construção em monorepos.
- **Tailwind CSS**: Um framework CSS utilitário que permite estilizar suas aplicações de forma rápida e eficiente.

## 🚀 Funcionalidades

- **Estrutura de Monorepo**: Mantenha todos os seus pacotes e aplicações em um único repositório, facilitando o gerenciamento e a colaboração.
- **Desempenho Aprimorado**: Com Turbo.build, você obtém um tempo de compilação mais rápido e uma experiência de desenvolvimento mais suave.
- **Estilização Moderna**: Utilize Tailwind CSS para criar designs responsivos e personalizáveis sem complicações.

## Iniciando o tal do monorepo com Yarn Workspaces

- Criando projeto monorepo

```sh
mkdir project
cd project

mkdir packages
mkdir apps
```

- Configurando package.json

```
{
  "name": "monorepo",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
}
```

- Comando úteis para adicionar dependencias

```sh
# instalar todas a dependencias
yarn install

# instalar dependencias a nivel workspace
yarn add -D tailwindcss postcss autoprefixer -W

# instalar dependencias em uma aplicação do nonorepo
yarn workspace @monorepo/ui add react@^18.3.1
```

### Criando projetos

#### Criando pacote ui

- Criando pacote

```sh
cd packages
mkdir ui

yarn init -y
```

- Configurando package.json

```json
{
  "name": "@monorepo/ui"
}
```

- Criando e exportando componentes

```tsx
// packages/ui/src/components/Button.jsx

import { FC, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {};

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className="text-white p-2 bg-green-500 " {...props}>
      {children}
    </button>
  );
};
```

- Exportando componentes

```tsx
// packages/ui/src/components/index.ts

import "./index.css"; // Importando o Tailwind no componente

export * from "./Button";
```

- Exportando os componentes para importação

```tsx
export * from "./components";
```

#### Criando projeto dashboard

- Criando dashboard

```sh
cd apps
yarn vite create dashboard
```

- Configurando package.json

```json
{
  "name": "@monorepo/dashboard",
  // ...

  "dependencies": {
    "@monorepo/ui": "1.0.0"
  }
}
```

- Configurando package.json

```sh
yarn workspace @monorepo/dashboard add @monorepo/ui@1.0.0
```

- Utilizando packate

```tsx
import { Button } from "@monorepo/ui";

function App() {
  return (
    <>
      <Button onClick={() => console.log("HELLO")}>Content</Button>
    </>
  );
}
yarn workspace @monorepo/dashboard add @monorepo/ui@1.0.0
```

- Utilizando packate

```tsx
// apps/dashboard/src/App.tsx
import { Button } from "@monorepo/ui";

function App() {
  return (
    <>
      <Button onClick={() => console.log("HELLO")}>Content</Button>
    </>
  );
}

export default App;
```

### Configurando Tailwind CSS

#### Configurando Tailwind CSS no Dashboard

- Iniciando configuração no projeto ui

```sh
cd packages/ui
npx tailwindcss init -p
```

- Renomeando `postcss.config.js` para `postcss.config.cjs`

- Configurando `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

#### Configurando Tailwind CSS no Dashboard

- Iniciando configuração no projeto dashboard

```sh
cd apps/dashboard
npx tailwindcss init -p
```

- Renomeando `postcss.config.js` para `postcss.config.cjs`

- Configurando `tailwind.config.js`

```js
import config from "../../packages/ui/src/tailwind.config";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Configurando Turbo.build

- Instalando turbo (na raiz do projeto)

```sh
yarn add -D turbo -W
```

- Configuração do turbo.json (na raiz do projeto)

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    // Executa a task build, no package.json executa o script "build"
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    // Executa a task check-types, no package.json executa o script "check-types"
    "check-types": {
      "dependsOn": ["^check-types"]
    },
    // Executa a task dev, no package.json executa o script "dev"
    "dev": {
      "persistent": true,
      "cache": false
    }
  }
}
```

- Configurando scripts no package.json (em site | dashboard)

```json
{
  // ...
  "scripts": {
    "check-types": "tsc --noEmit"
  }
}
```

- Configurando scripts no package.json (raiz do projeto)

```json
{
  "name": "monorepo",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "private": true,
  "packageManager": "yarn@1.22.19",
  "scripts": {
    "dev": "turbo dev --parallel",
    "build": "turbo build"
  },
  "workspaces": ["packages/*", "apps/*"],
  "devDependencies": {
    // ....
  }
}
```
