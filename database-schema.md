# Esquema do Banco de Dados

Este documento contém a estrutura das tabelas relacionais utilizadas no projeto, assim como seus campos e relacionamentos principais (utilizados para a extração de dados do pipeline).

## Tabelas e Campos

### Tabela: produtos
Tabela responsável por armazenar os itens disponíveis no cardápio.

| Campo     | Tipo           | Descrição             |
|-----------|----------------|-----------------------|
| id        | INT            | Identificador único   |
| nome      | VARCHAR(255)   | Nome do produto       |
| categoria | VARCHAR(100)   | Categoria do produto  |
| preco     | DECIMAL(10, 2) | Preço unitário        |
| sku       | VARCHAR(50)    | Código SKU            |

### Tabela: clientes
Armazena os dados básicos de contato e endereço dos clientes cadastrados.

| Campo  | Tipo         | Descrição           |
|--------|--------------|---------------------|
| id     | INT          | Identificador único |
| nome   | VARCHAR(255) | Nome do cliente     |
| email  | VARCHAR(255) | E-mail do cliente   |
| cidade | VARCHAR(100) | Cidade              |
| estado | VARCHAR(2)   | Estado (UF)         |

### Tabela: pedidos
Registra os cabeçalhos dos pedidos realizados pelos clientes.

| Campo        | Tipo           | Descrição                  |
|--------------|----------------|----------------------------|
| id           | INT            | Identificador único        |
| cliente_id   | INT            | Referência ao cliente      |
| status       | VARCHAR(50)    | Status do pedido           |
| subtotal     | DECIMAL(10, 2) | Subtotal                   |
| imposto      | DECIMAL(10, 2) | Valor de impostos          |
| total        | DECIMAL(10, 2) | Total do pedido            |
| data_entrega | DATE           | Data prevista de entrega   |

### Tabela: itens_pedido
Tabela pivô que relaciona os pedidos com os produtos selecionados no carrinho.

| Campo          | Tipo           | Descrição                      |
|----------------|----------------|--------------------------------|
| id             | INT            | Identificador único            |
| pedido_id      | INT            | Referência ao pedido           |
| produto_id     | INT            | Referência ao produto          |
| quantidade     | INT            | Quantidade do produto          |
| preco_unitario | DECIMAL(10, 2) | Preço no momento da compra     |

## Relacionamentos

A estrutura do banco utiliza as seguintes chaves estrangeiras para relacionar os dados no SQL:
* clientes (id) <-> pedidos (cliente_id): Relacionamento 1:N onde um cliente pode ter vários pedidos registrados.
* pedidos (id) <-> itens_pedido (pedido_id): Relacionamento 1:N vinculando o cabeçalho geral do pedido aos seus respectivos itens.
* produtos (id) <-> itens_pedido (produto_id): Relacionamento 1:N vinculando os produtos do catálogo ao registro do item comprado.
