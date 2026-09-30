# 1.0

## TC1 - Registrar demanda com dados válidos
  Preencher categoria, descrição e localização e enviar.
  
  Esperado: demanda registrada com sucesso.

## TC2 - Registrar demanda sem preencher os campos obrigatórios
  Deixar os campos em branco e tentar enviar.
  
  Esperado: sistema exibe erro de validação.

## TC3 - Registrar demanda com categoria inválida
  Selecionar/inserir uma categoria que não existe.
  
  Esperado: sistema recusa o registro.

## TC4 - Verificar se a demanda aparece na lista do usuário após o registro
  Esperado: a demanda registrada aparece na lista.

## TC5 - Verificar se o usuário recebe um protocolo após o registro
  Esperado: um número de protocolo é exibido.


# 2.0 

## TC-01 | HU-13 | Transição UNDER_ANALYSIS -> IN_PROGRESS
  Nível: Componente | Técnica: transição de estados
  
  Pré: demanda em UNDER_ANALYSIS
  
  Passos: chamar transicaoPermitida('UNDER_ANALYSIS','IN_PROGRESS')
  
  Esperado: retorna true
  
  Pós: nenhum efeito colateral (função pura)

## TC-02 | HU-13 | Transição RECEIVED -> RESOLVED (salto de etapa)
  Nível: Componente | Técnica: transição de estados
  
  Pré: demanda em RECEIVED
  
  Passos: chamar transicaoPermitida('RECEIVED','RESOLVED')
 
  Esperado: retorna false
  
  Pós: nenhum efeito colateral

## TC-03 | HU-06/CA "Categoria fora da lista fechada" | Categoria inválida é recusada
  Nível: Sistema (API) | Técnica: partição de equivalência (valor inválido)
  
  Pré: cidadão autenticado com token válido
  
  Passos: POST /demands com category="BURACO"
  
  Esperado: 400 VALIDATION_ERROR, details aponta o campo "category"
  
  Pós: nenhuma demanda criada

## TC-04 | HU-06/CA "Coordenada fora de faixa" | Latitude acima do limite é recusada
  Nível: Sistema (API) | Técnica: valor limite (latitude = 91, limite é 90)
  
  Pré: cidadão autenticado
  
  Passos: POST /demands com latitude=91
  
  Esperado: 400 VALIDATION_ERROR
  
  Pós: nenhuma demanda criada

## TC-05 | HU-03/CA "Gestor tenta registrar demanda" | Gestor não pode registrar demanda
  Nível: Sistema (API) | Técnica: tabela de decisão (papel x operação)
  
  Pré: gestor autenticado
  
  Passos: POST /demands com corpo válido
  
  Esperado: 403 FORBIDDEN
  
  Pós: nenhuma demanda criada

## TC-06 | HU-02/HU-06/HU-07/HU-08 | Fluxo completo do cidadão pela UI
  
  Nível: Sistema (E2E) | Técnica: análise de fluxo funcional (caminho feliz)
  
  Pré: cidadão com credenciais válidas, SUT com estado limpo
  
  Passos: login -> preencher e enviar demanda -> ler protocolo -> abrir lista
  
  Esperado: protocolo no formato DEM-<ano>-<seq>; item aparece na lista com
            status RECEIVED
  
  Pós: uma demanda registrada para o cidadão de teste

## TC-07 | HU-02/CA "Credenciais incorretas" | Login com senha errada não libera a sessão
  Nível: Sistema (E2E) | Técnica: partição de equivalência (credencial inválida)
  
  Pré: nenhuma
  
  Passos: informar e-mail válido e senha incorreta -> tentar entrar
  
  Esperado: mensagem de erro exibida; seções autenticadas continuam ocultas
  
  Pós: nenhuma sessão iniciada
