----------------------  VRP  ------------------------
local Tunnel = module("vrp", "lib/Tunnel")
local Proxy = module("vrp", "lib/Proxy")
local Tools = module("vrp", "lib/Tools")
local cfg = module("vrp", "cfg/groups")

vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP")

src = {}
Tunnel.bindInterface("prMDT", src)
Proxy.addInterface("prMDT", src)

vCLIENT = Tunnel.getInterface("prMDT")
----------------------  Variables  ------------------------
local groups = cfg.groups
------------------------ Script ----------------------

function src.infos()
    local source = source
    local user_id = vRP.getUserId(source)

    if user_id then
        local identity = vRP.getUserIdentity(user_id)

        local org = vRP.getUserGroupByType(user_id, "job")
        if org == nil then org = "Nenhum(a)" end

        if identity then
            return identity.name, identity.firstname, identity.user_id, org
        end
    end
end

RegisterServerEvent("getAllPlayers")
AddEventHandler("getAllPlayers", function()
    local count = MySQL.Sync.fetchScalar("SELECT COUNT(*) FROM vrp_users")
    count = tonumber(count)
    TriggerClientEvent("receivePlayerCount", source, count)
end)

RegisterServerEvent("getAllOffices")
AddEventHandler("getAllOffices", function()
    local countO = MySQL.Sync.fetchScalar("SELECT COUNT(*) FROM prmdt_funcionarios")
    countO = tonumber(countO)
    TriggerClientEvent("receiveOfficeCount", source, countO)
end)

local function checkDuplicatedUser(data)

    local name = data.name
    local firstname = data.firstname
    local id = data.identity
    local cargo = data.org

    local query = string.format(
                      "SELECT * FROM prmdt_funcionarios WHERE name = @name AND firstname = @firstname AND id = @id and cargo = @cargo",
                      {
            ['@name'] = name,
            ['@cargo'] = cargo,
            ['@firstname'] = firstname,
            ['@id'] = id
        })

    local result = MySQL.Sync.fetchScalar(query)

    if result and #result > 0 then return true end

    return false
end

local function insertPlayerInDB(data)
    local name = data.name
    local firstname = data.firstname
    local id = data.identity
    local org = data.org

    local query = string.format(
                      "INSERT INTO prmdt_funcionarios (name, firstname, id, cargo) VALUES (@name, @firstname, @id, @cargo)")
    local parameters = {
        ['@name'] = name,
        ['@cargo'] = org,
        ['@firstname'] = firstname,
        ['@id'] = id
    }

    for param, value in pairs(parameters) do
        if value == nil then
            print("Erro: o valor do parâmetro " .. param .. " é nulo")
        end
    end

    MySQL.Async.execute(query, parameters, function(rowsAffected)
        -- Verifique o número de linhas afetadas para saber se a inserção foi bem-sucedida
        if rowsAffected > 0 then
            print("Inserção no banco de dados realizada com sucesso.")
        else
            print("Erro ao inserir os dados no banco de dados.")
        end
    end)
end

RegisterServerEvent("sendInfoToServer")
AddEventHandler("sendInfoToServer", function(data)

    local source = source

    local name = data.name -- "Domada"
    local firstname = data.firstname -- "ORico"
    local id = data.identity -- "Passaporte"
    local org = data.org -- "Coronel"

    if name and firstname and id and org then
        if not checkDuplicatedUser(data) then
            insertPlayerInDB(data)
            TriggerClientEvent("infoSentConfirmation", source)
        else
            TriggerClientEvent("infoDuplicateError", source)
        end
    else
        TriggerClientEvent("infoMissingError", source)
    end
end)


function src.checkPermission()
	local source = source
	local user_id = vRP.getUserId(source)
	return vRP.hasPermission(user_id,"policia.permissao")
end