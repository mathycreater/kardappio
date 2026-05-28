# Documentação da API

Este documento contém os endpoints da API, requisições e exemplos de respostas. A API é mockada para fins de avaliação, simulando o destino final do pipeline.

## Endpoints

### GET /produtos
Retorna a lista de produtos disponíveis no sistema.

Resposta de Sucesso:
```json
{
  "sucesso": true,
  "dados": [
    {
      "id": 1,
      "nome": "Produto A",
      "categoria": "categoria1",
      "preco": 25.90,
      "sku": "SKU-001"
    }
  ]
}
```

### GET /estoque/{produto_id}
Retorna informações sobre o estoque atual de um produto específico. Utilizado no enriquecimento de dados.

Resposta de Sucesso:
```json
{
  "sucesso": true,
  "dados": {
    "produto_id": 1,
    "quantidade_disponivel": 150,
    "quantidade_reservada": 10
  }
}
```

### POST /pedidos
Cria um novo pedido no sistema. Este é o endpoint principal utilizado pela nossa estrutura após as regras de negócio.

Body (Request):
```json
{
  "cliente_id": 123,
  "itens": [
    {"produto_id": 1, "quantidade": 2},
    {"produto_id": 3, "quantidade": 1}
  ],
  "data_entrega": "2024-01-25"
}
```

Resposta de Sucesso (201 Created):
```json
{
  "sucesso": true,
  "dados": {
    "pedido_id": 5001,
    "cliente_id": 123,
    "status": "pendente",
    "total": 68.79,
    "criado_em": "2024-01-20T15:00:00Z"
  }
}
```

### GET /pedidos/{pedido_id}
Busca os detalhes de um pedido específico pelo seu ID de registro.

Resposta de Sucesso:
```json
{
  "sucesso": true,
  "dados": {
    "pedido_id": 5001,
    "cliente_id": 123,
    "status": "confirmado",
    "itens": [
      {
        "produto_id": 1,
        "quantidade": 2,
        "preco_unitario": 25.90,
        "total": 51.80
      }
    ],
    "total": 68.79
  }
}
```

### PATCH /pedidos/{pedido_id}
Atualiza o status de um pedido existente (exemplo: atualizar pedido para enviado).

Body (Request):
```json
{
  "status": "enviado",
  "numero_rastreamento": "BR123456789"
}
```

Resposta de Sucesso:
```json
{
  "sucesso": true,
  "dados": {
    "pedido_id": 5001,
    "status": "enviado",
    "atualizado_em": "2024-01-20T16:00:00Z"
  }
}
```
