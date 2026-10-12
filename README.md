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
| `sensor.<pet>_proximo_vencimento` | Data mais próxima entre os "próximos vencimentos" (atrasados continuam aparecendo) |
| `image.<pet>_foto` | Foto de perfil |

Cada sensor de "último" traz nos atributos: `description`, `notes`, `next_due`, `days_since`, `record_id`, `total_records` e `history` (últimos 10 registros).

## Instalação pelo HACS

1. HACS → menu ⋮ → **Repositórios personalizados**
2. Cole a URL deste repositório e escolha a categoria **Integração**
3. Instale **HA Pet Care** e reinicie o Home Assistant
4. **Configurações → Dispositivos e serviços → Adicionar integração → HA Pet Care**

## Adicionando pets

Em **HA Pet Care → Configurar → Adicionar um pet**: nome, espécie, data de nascimento e, opcionalmente, o caminho da foto (um arquivo dentro da pasta de configuração, por exemplo `/config/www/pets/rex.jpg`). A foto é copiada para dentro da integração, então o arquivo original pode ser apagado depois.

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

## Exemplo: avisar 7 dias antes do vencimento

```yaml
automation:
  - alias: "Pets: vencimento chegando"
    trigger:
      - platform: time
        at: "09:00:00"
    condition:
      - condition: template
        value_template: >
          {{ state_attr('sensor.rex_proximo_vencimento', 'days_until') is not none
             and state_attr('sensor.rex_proximo_vencimento', 'days_until') <= 7 }}
    action:
      - action: notify.notify
        data:
          title: "Rex"
          message: >
            {{ state_attr('sensor.rex_proximo_vencimento', 'type') }} vence em
            {{ state_attr('sensor.rex_proximo_vencimento', 'days_until') }} dia(s).
```

Os nomes das entidades dependem do idioma do seu Home Assistant e do nome do pet; confira em **Configurações → Dispositivos e serviços**.

## Desenvolvimento

- Domínio: `ha_pet_care`
- Dados em `.storage/ha_pet_care.<entry_id>`; fotos em `<config>/ha_pet_care_photos/`
- Validações no GitHub Actions: `hacs/action` e `hassfest`

## Licença

MIT
