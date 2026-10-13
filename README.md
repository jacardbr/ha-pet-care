# HA Pet Care para Home Assistant

Integração customizada para registrar o histórico de cuidados dos seus pets: **vacinas, vermífugos, exames, banhos, tosas e consultas veterinárias**, com **foto de perfil** de cada pet. Tudo fica salvo localmente no seu Home Assistant, sem nuvem.

## O que ela cria

Para cada pet, um dispositivo com:

| Entidade | O que mostra |
| --- | --- |
| `sensor.<pet>_ultima_vacina` | Data da última vacina |
| `sensor.<pet>_ultimo_vermifugo` | Data do último vermífugo |
| `sensor.<pet>_ultimo_exame` | Data do último exame |
| `sensor.<pet>_ultimo_banho` | Data do último banho |
| `sensor.<pet>_ultima_tosa` | Data da última tosa |
| `sensor.<pet>_ultima_consulta` | Data da última consulta |
| `sensor.<pet>_proxima_vacina` | Data da próxima vacina: **1 ano** depois da última vacina, calculada automaticamente |
| `sensor.<pet>_proximo_vermifugo` | Data do próximo vermífugo: **6 meses** depois do último vermífugo, calculada automaticamente |
| `sensor.<pet>_idade` | Idade calculada a partir da data de nascimento (ex.: "2 anos e 3 meses"); atributos com `years`, `months`, `total_months`, `decimal_years`, `next_birthday`, `days_until_birthday` e `is_birthday` |
| `sensor.<pet>_peso` | Último peso em kg; atributos com `previous_weight`, `change`, `first_weight`, `change_since_first` e `history` (últimos 20 pesos) |
| `number.<pet>_registrar_peso` | Campo único do peso: mostra o último peso; digite um novo valor e ele é salvo na hora, com a data de hoje |
| `button.<pet>_registrar_vacina`, `..._vermifugo`, `..._banho`, `..._tosa`, `..._consulta` | Um botão para cada tipo de registro: grava o evento com a data de hoje |
| `image.<pet>_foto` | Foto de perfil |

Cada sensor de "último" traz nos atributos: `description`, `notes`, `next_due`, `days_since`, `record_id`, `total_records` e `history` (últimos 10 registros).

## Instalação pelo HACS

1. HACS → menu ⋮ → **Repositórios personalizados**
2. Cole a URL deste repositório e escolha a categoria **Integração**
3. Instale **HA Pet Care** e reinicie o Home Assistant
4. **Configurações → Dispositivos e serviços → Adicionar integração → HA Pet Care**

## Adicionando pets

Em **HA Pet Care → Configurar → Adicionar um pet**: nome, espécie, data de nascimento e, opcionalmente, a foto, que você anexa direto na tela (JPG, PNG, WEBP ou GIF). Para trocar ou incluir a foto depois, use **Configurar → Alterar a foto de um pet**. A foto fica guardada dentro do Home Assistant, então o arquivo original pode ser apagado.

## Ações (serviços)

### `ha_pet_care.add_record`

```yaml
action: ha_pet_care.add_record
data:
  pet: Rex
  type: vaccine        # vaccine | deworming | exam | bath | grooming | vet_visit
  date: "2026-10-12"   # opcional, padrão é hoje
  description: V10     # opcional
  notes: Sem reação    # opcional
  next_due: "2027-10-12"  # opcional
```

Retorna o `record_id` do registro criado e dispara o evento `ha_pet_care_record_added`.

### `ha_pet_care.remove_record`

```yaml
action: ha_pet_care.remove_record
data:
  pet: Rex
  record_id: a1b2c3d4
```

### `ha_pet_care.set_photo`

```yaml
action: ha_pet_care.set_photo
data:
  pet: Rex
  path: /config/www/pets/rex.jpg
```

## Registrando pela tela do dispositivo

Na tela do dispositivo do pet há um botão para cada tipo de registro (**Registrar vacina**, **vermífugo**, **banho**, **tosa** e **consulta**). Apertar o botão grava o evento com a data de hoje e atualiza o sensor correspondente. Exames são registrados pela ação `ha_pet_care.add_record` (tipo `exam`).

Para registrar uma data passada, ou incluir descrição, observações ou uma próxima data específica, use a ação `ha_pet_care.add_record`.

## Peso e crescimento

Na tela do dispositivo do pet, o campo **Registrar peso** mostra o último peso. Digite o novo valor (em kg) e confirme: ele é salvo na hora, com a data de hoje, e o sensor **Peso** passa a mostrar o novo valor, com a variação em relação ao anterior. Se digitar outro valor no mesmo dia, o peso de hoje é corrigido em vez de criar um segundo registro. Use o gráfico de histórico do sensor para acompanhar o crescimento.

Para registrar outra data, ou automaticamente (por exemplo, de uma balança inteligente), use a ação:

```yaml
action: ha_pet_care.add_weight
data:
  pet: Rex
  weight: 4.2
  date: "2026-10-12"   # opcional, padrão é hoje
```

Retorna o `record_id` e dispara o evento `ha_pet_care_weight_added`. Para apagar um peso lançado por engano, use `ha_pet_care.remove_weight` com o `pet` e o `record_id` (aparece no atributo `history` do sensor).

## Próxima vacina e próximo vermífugo

Os sensores **Próxima vacina** e **Próximo vermífugo** se preenchem sozinhos: assim que você registra uma vacina, a próxima fica 1 ano depois; ao registrar um vermífugo, o próximo fica 6 meses depois. Se o mês de destino for mais curto, o dia é ajustado (31/08 + 6 meses = 28/02). Para um prazo diferente em um registro específico, informe `next_due` na ação `ha_pet_care.add_record`: essa data vale no lugar da automática.

Atributos: `last_date`, `days_until` (negativo quando atrasado), `overdue`, `source` (`automatic` ou `manual`) e `interval_months`. Sem nenhum registro do tipo, o sensor fica desconhecido.

## Exemplo: avisar 7 dias antes da vacina

```yaml
automation:
  - alias: "Pets: vacina chegando"
    trigger:
      - platform: time
        at: "09:00:00"
    condition:
      - condition: template
        value_template: >
          {{ state_attr('sensor.rex_proxima_vacina', 'days_until') is not none
             and state_attr('sensor.rex_proxima_vacina', 'days_until') <= 7 }}
    action:
      - action: notify.notify
        data:
          title: "Rex"
          message: >
            A próxima vacina vence em
            {{ state_attr('sensor.rex_proxima_vacina', 'days_until') }} dia(s).
```

Os nomes das entidades dependem do idioma do seu Home Assistant e do nome do pet; confira em **Configurações → Dispositivos e serviços**.

## Desenvolvimento

- Domínio: `ha_pet_care`
- Dados em `.storage/ha_pet_care.<entry_id>`; fotos em `<config>/ha_pet_care_photos/`
- Validações no GitHub Actions: `hacs/action` e `hassfest`

## Licença

MIT
