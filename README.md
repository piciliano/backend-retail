### API VAREJO DEVTOOLS

## FUNCIONALIDADES

# ENTITIE USER

[x] - Deve ser possível criar um usuário
[x] - Deve ser possível buscar um usuário por id
[x] - Deve ser possível autenticar um usuário
[x] - Pode existir três tipos de usuários [admin,functionay]
[x] - Deve ser possível um softDelete ou delete
[x] - Deve ser possível cadastrar apenas um usuário por email
[x] - Deve ser possível atualizar um usuário

# ENTITIE PRODUCT

[x] - Deve ser possível cadastrar produto
[x] - Deve ser possível buscar todos os produtos
[x] - Deve ser possível busar um produto por id
[x] - Deve ser possível deletar um produto
[] - Deve ser possível exportar o banco em excel
[] - Deve ser possível subir uma base de excel de um produto

# REGRAS FUNCIONAIS

[] - Somente admin e líder podem cadastrar produto
[] - Os produtos não podem ficar com quantidade negativa
[] - Quando produto chegar à 5, deve enviar um email para o lider 
[] - Produtos em estoque podem ter no máximo 100 quantidades
[] - Quando produto chegar a 0, deve desativar o produto
[] - Decorator para autenticação