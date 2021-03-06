# Vuegenda [versão Alpha]

Projeto Open Source de agenda de eventos feita com VueJS.

Ainda está em desenvolvimento mas segue algumas features que vão estar presentes:

- Criação de mapa interativo
- Integração com Mercado Pago, Pagseguro e Cielo
- Preparado para Cordova
- Checkout simplificado e otimizado para mobile
- Notificação via SMS
- Notificações Push
- Painel administrativo
- Configuração avançada de eventos
- Geolocalização
- Pesquisa avançada por: localização, categoria, tags, faixa de preço, datas, métodos de pagamento, tipos de entrada, etc

Usuário de teste:

username: vuegenda
password: 123432345

# Documentação

### Componentes

DaysBar - Exibe o seletor de datas

GridItem - Exibição de cada evento nas listagens

Header - Cabeçalho geral

LocationSelector - Seleção de cidade. Localizado no header do site

MapEvento - Exibe Mapa SVG interativo do evento

MapSetor - Exibe SVG interativo do setor selecionado

Search - Barra de pesquisa

#### Eventos

dateChanged - Emitido ao alterar a data

locationChanged - Emitido quando a localização (cidade/estado) é alterada pelo seletor do header

userSignup - Emitido quando um novo usuário cadastra-se

userLogin - Emitido quando o usuário faz login

autoRefresh - Emitido a cada 60 segundos. Usando para atualizar dados frequentemente.

clickOnBody - Emitido quando clica-se no conteúdo, menos no header e no footer.

setHov - Emitido no mouseover sobre algum setor no momento da compra.

setOut - Emitido no mouseout sobre algum setor no momento da compra.

## Segurança

Para consumir a API é necessário obter uma chave que é usada no momento do build. Esse token é verificado
de acordo com a origem da requisição. 

As origens 127.0.0.1 e localhost estão liberadas por padrão.


# Versões

2.0.0 - Adicionado protocolo de segurança para consumo da API
\
1.9.0 - Adicionado sistema de Geolocalização
\
1.8.7 - Atualização da documentação
\
1.8.6 - Remoção dos screenshots
\
1.8.5 - Atualizações na página de Login
\
1.8.4 - Excluido eventos do dia dos "outros eventos"
\
1.8.3 - Ajuste de erro no README
\
1.8.2 - Atualização da documentação
\
1.8.1 - Alterado campo de senha na página de Login para "type password"
\
1.8.0 - Adicionado página de cadastro
\
1.7.12 - Correção de bug na página de categoria
\
1.7.11 - Correção de bug no componente Header
\
1.7.10 - Refatoração na página de categoria
\
1.7.9 - Correção de bug na página de categoria
\
1.7.8 - Correção de bug no componente DaysBar
\
1.7.7 - Alteração no README.md
\
1.7.6 - Alteração no README.md
\
1.7.5 - Alteração no README.md
\
1.7.4 - Alterada documentação do componente DaysBar
\
1.7.3 - Refatoração e documentação do componente DaysBar
\
1.7.2 - Alterado nome do evento "changeDate" para "dateChanged"
\
1.7.1 - Refatoração do arquivo de rotas
\
1.7.0 - Adicionado sistema de login usando JWT. Usuário: vuegenda, Senha: 123432345
\
1.6.6 - Removidos arquivos de configuração do ACF
\
1.6.2 - Adicionado filtro de cidades