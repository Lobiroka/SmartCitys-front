# Casos de Teste

## CT-HU13-CA01-COMPONENTE-004 — Confirmar que transicaoPermitida retorna true para UNDER_ANALYSIS → IN_PROGRESS

**História de Usuário:** HU-13 — Atualização de status da demanda

**Critério de Aceite:** CA01 — Transição válida

**Técnica de teste:** Teste de transição de estados

**Nível:** COMPONENTE

**Modalidade:** AUTOMATIZADO

**Endpoint relacionado:** N/A (função pura, sem chamada de rede)

**Pré-condições:**
1. [INFORMAÇÃO INSUFICIENTE] A assinatura exata da função `transicaoPermitida` (módulo, parâmetros e tipo de retorno) não está documentada; o testador deve localizá-la no código-fonte.
2. Nenhum estado externo necessário; a função é pura e não acessa banco de dados ou rede.

**Passos:**
1. Chamar `transicaoPermitida('UNDER_ANALYSIS', 'IN_PROGRESS')`.
2. Capturar o valor de retorno.

**Resultados esperados:**
1. O valor de retorno é `true`.

**Pós-condições:**
1. Nenhum efeito colateral; nenhum estado externo alterado.

---

## CT-HU13-CA05-COMPONENTE-002 — Confirmar que transicaoPermitida retorna false para RECEIVED → RESOLVED (salto de etapa)

**História de Usuário:** HU-13 — Atualização de status da demanda

**Critério de Aceite:** CA05 — Salto de etapa

**Técnica de teste:** Teste de transição de estados

**Nível:** COMPONENTE

**Modalidade:** AUTOMATIZADO

**Endpoint relacionado:** N/A (função pura, sem chamada de rede)

**Pré-condições:**
1. [INFORMAÇÃO INSUFICIENTE] A assinatura exata da função `transicaoPermitida` (módulo, parâmetros e tipo de retorno) não está documentada; o testador deve localizá-la no código-fonte.
2. Nenhum estado externo necessário; a função é pura e não acessa banco de dados ou rede.

**Passos:**
1. Chamar `transicaoPermitida('RECEIVED', 'RESOLVED')`.
2. Capturar o valor de retorno.

**Resultados esperados:**
1. O valor de retorno é `false`.

**Pós-condições:**
1. Nenhum efeito colateral; nenhum estado externo alterado.

---

## CT-HU06-CA04-SERVICO-003 — Rejeitar categoria fora da lista fechada com valor "BURACO"

**História de Usuário:** HU-06 — Registro da demanda urbana

**Critério de Aceite:** CA04 — Categoria fora da lista fechada

**Técnica de teste:** Particionamento de equivalência (valor inválido)

**Nível:** SERVIÇO

**Modalidade:** AUTOMATIZADO

**Endpoint relacionado:** `POST /api/v1/demands`, `GET /api/v1/demands`

**Pré-condições:**
1. Ambiente de teste isolado, com massa de dados controlada e acesso à base `/api/v1` (ver pendência P-25 sobre criação e limpeza de massa).
2. Cidadão A autenticado, com `accessToken` válido enviado no cabeçalho `Authorization: Bearer <accessToken>`.
3. Total T0 de demandas de A conhecido.

**Passos:**
1. Enviar `POST /api/v1/demands` com os demais campos válidos (`description` com 120 caracteres, `location` = { `latitude`: -8.0578, `longitude`: -34.8829, `region`: `RPA_3` }) e `category` = "BURACO".
2. Inspecionar `error.details` da resposta.
3. Consultar `GET /api/v1/demands` com o token de A.

**Resultados esperados:**
1. Código HTTP 400 com `error.code` = `VALIDATION_ERROR`.
2. `details` contém item com `field` = "category" e `issue` preenchido.
3. `pagination.totalItems` = T0.

**Pós-condições:**
1. Nenhuma demanda criada.

---

## CT-HU06-CA05-SERVICO-002 — Rejeitar latitude acima do limite (latitude = 91)

**História de Usuário:** HU-06 — Registro da demanda urbana

**Critério de Aceite:** CA05 — Coordenada fora de faixa

**Técnica de teste:** Análise de valor-limite (latitude = 91, limite superior é 90)

**Nível:** SERVIÇO

**Modalidade:** AUTOMATIZADO

**Endpoint relacionado:** `POST /api/v1/demands`

**Pré-condições:**
1. Ambiente de teste isolado, com massa de dados controlada e acesso à base `/api/v1` (ver pendência P-25 sobre criação e limpeza de massa).
2. Cidadão A autenticado, com `accessToken` válido enviado no cabeçalho `Authorization: Bearer <accessToken>`.

**Passos:**
1. Enviar `POST /api/v1/demands` com os demais campos válidos (`category` = `ROAD_MAINTENANCE`, `description` com 120 caracteres, `location.longitude` = -34.8829, `location.region` = `RPA_3`) e `location.latitude` = 91.
2. Inspecionar `error.details` da resposta.

**Resultados esperados:**
1. Código HTTP 400 com `error.code` = `VALIDATION_ERROR`.
2. `details` contém item com `field` = "location.latitude" e `issue` preenchido.

**Pós-condições:**
1. Nenhuma demanda criada.

---

## CT-HU03-CA02-SERVICO-003 — Negar registro de demanda ao gestor com corpo completo e válido

**História de Usuário:** HU-03 — Segregação de acesso por perfil

**Critério de Aceite:** CA02 — Gestor tenta registrar demanda

**Técnica de teste:** Tabela de decisão (papel × operação)

**Nível:** SERVIÇO

**Modalidade:** AUTOMATIZADO

**Endpoint relacionado:** `POST /api/v1/demands`, `GET /api/v1/demands`

**Pré-condições:**
1. Ambiente de teste isolado, com massa de dados controlada e acesso à base `/api/v1` (ver pendência P-25 sobre criação e limpeza de massa).
2. Gestor (papel `MANAGER`) autenticado, com `accessToken` válido (ver pendência P-25 sobre a criação de contas de gestor).
3. Total T0 de demandas obtido por `GET /api/v1/demands` como gestor.

**Passos:**
1. Enviar `POST /api/v1/demands` com corpo válido: `category` = `ROAD_MAINTENANCE`, `description` com 120 caracteres, `location` = { `latitude`: -8.0578, `longitude`: -34.8829, `region`: `RPA_3` } usando o token do gestor.
2. Consultar `GET /api/v1/demands` como gestor.

**Resultados esperados:**
1. Código HTTP 403 com `error.code` = `FORBIDDEN`.
2. `pagination.totalItems` = T0.

**Pós-condições:**
1. Nenhuma demanda criada.

---

## CT-HU07-CA01-E2E-003 — Concluir fluxo completo do cidadão pela interface: login, registro, protocolo e listagem

**História de Usuário:** HU-07 — Protocolo e comprovante do registro

**Critério de Aceite:** CA01 — Protocolo gerado na criação

**Técnica de teste:** Análise de fluxo funcional (caminho feliz)

**Nível:** E2E

**Modalidade:** MANUAL

**Endpoint relacionado:** N/A (interface); `GET /api/v1/demands` para conferência

**Pré-condições:**
1. [INFORMAÇÃO INSUFICIENTE] Rotas, telas, campos e elementos de interface não estão documentados (P-24); o testador deve localizá-los na aplicação em execução.
2. Cidadão com credenciais válidas (e-mail e senha conhecidos).
3. SUT em estado limpo, sem demandas anteriores do cidadão de teste.

**Passos:**
1. Abrir a tela de login, informar e-mail e senha do cidadão e confirmar.
2. Preencher o formulário de nova demanda com dados válidos (categoria, descrição, localização e região) e submeter.
3. Ler o protocolo exibido na tela de confirmação.
4. Abrir a lista de demandas do cidadão.

**Resultados esperados:**
1. O login é aceito e o cidadão é direcionado à área autenticada.
2. O formulário é aceito sem mensagens de erro e a tela de confirmação é exibida.
3. O protocolo exibido corresponde à expressão `^DEM-[0-9]{4}-[0-9]{6}$`. [INFORMAÇÃO INSUFICIENTE] Não está definido de qual data/fuso é o `<ano>` (P-12).
4. A demanda recém-criada aparece na lista com status `RECEIVED` e o mesmo protocolo exibido na confirmação.

**Pós-condições:**
1. Uma demanda registrada para o cidadão de teste, em status `RECEIVED`.

---

## CT-HU02-CA03-E2E-004 — Permanecer na tela de login e ocultar área autenticada após senha incorreta

**História de Usuário:** HU-02 — Autenticação

**Critério de Aceite:** CA03 — Credenciais incorretas

**Técnica de teste:** Particionamento de equivalência (credencial inválida)

**Nível:** E2E

**Modalidade:** MANUAL

**Endpoint relacionado:** N/A (interface)

**Pré-condições:**
1. [INFORMAÇÃO INSUFICIENTE] Rotas, telas, campos e elementos de interface não estão documentados (P-24); o testador deve localizá-los na aplicação em execução.
2. Existe cidadão ativo com e-mail válido conhecido.

**Passos:**
1. Abrir a tela de login, informar o e-mail válido do cidadão e uma senha incorreta.
2. Confirmar a tentativa de login.
3. Tentar navegar para uma seção autenticada da aplicação.

**Resultados esperados:**
1. —
2. É exibida mensagem de erro indicando falha de autenticação; o usuário permanece na tela de login.
3. O acesso à seção autenticada não é concedido; nenhuma sessão é iniciada.

**Pós-condições:**
1. Nenhuma sessão iniciada.
