### API VAREJO DEVTOOLS

## FUNCIONALIDADES

# ENTITIE USER

[x] - Deve ser possível criar um usuário
[x] - Deve ser possível buscar um usuário por id
[x] - Deve ser possível autenticar um usuário
[x] - Pode existir três tipos de usuários [admin,varegista,lider]
[x] - Deve ser possível um softDelete 
[x] - Deve ser possível cadastrar apenas um usuário por email
[x] - Deve ser possível atualizar um usuário

# ENTITIE RETAIL

[] - Deve ser possível cadastrar produto
[] - Deve ser possível buscar todos os produtos
[] - Deve ser possível busar um produto por id
[] - Deve ser possível retirar um produto
[] - Deve ser possível exportar o banco em excel
[] - Deve ser possível subir uma base de excel de um produto

# REGRAS FUNCIONAIS

[] - Somente admin e líder podem cadastrar produto
[] - Os produtos não podem ficar com quantidade negativa
[] - Quando produto chegar à 5, deve enviar um email para o lider informando
[] - Produtos em estoque podem ter no máximo 100 quantidades