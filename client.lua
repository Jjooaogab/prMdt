local Tunnel = module("vrp", "lib/Tunnel")
local Proxy = module("vrp", "lib/Proxy")
vRP = Proxy.getInterface("vRP")
vRPserver = Tunnel.getInterface("vRP", "prMDT")
src = {}
Tunnel.bindInterface("prMDT", src)
vSERVER = Tunnel.getInterface("prMDT")

--[[///////////////////        Variables        ///////////////////]]

local display = false
local name, firstname, identity, org = vSERVER.infos()
local count = vSERVER.getValuesOfPlayers()
local playerCount

local data = {
    name = name,
    firstname = firstname,
    identity = identity,
    org = org
}

--[[///////////////////        Events        ///////////////////]]

RegisterNetEvent("receivePlayerCount")
AddEventHandler("receivePlayerCount", function(count) 
    SendNUIMessage({count = count}) 
end)

RegisterNetEvent("receiveOfficeCount")
AddEventHandler("receiveOfficeCount", function(countO)
    SendNUIMessage({countO = countO}) 
end)

RegisterNetEvent("infoSentConfirmation")
AddEventHandler("infoSentConfirmation", function()
    print("Sucesso: As informações foram enviadas com sucesso!")
end)

RegisterNetEvent("infoDuplicateError")
AddEventHandler("infoDuplicateError", function()
    print("Erro: Os dados fornecidos já existem no banco de dados.")
end)

RegisterNetEvent("infoMissingError")
AddEventHandler("infoMissingError", function()
    print("Erro: Os dados estão incompletos")
end)

--[[///////////////////        Functions/Natives         ///////////////////]]

function SetDisplay(bool)
    display = bool
    SetNuiFocus(bool, bool)
    SendNUIMessage({type = "ui", status = bool})
end

function sendInfoToServer(data)
    if data.name ~= nil and data.firstname ~= nil and data.org ~= nil and
        data.identity ~= nil then
        TriggerServerEvent("sendInfoToServer", data)
    else
        print("Erro: Não foi possivel enviar os dados do usúario para o banco de dados")
    end
end

Citizen.CreateThread(function()
    while display do
        DisableControlAction(0, 1, display)
        DisableControlAction(0, 142, display)
        DisableControlAction(0, 18, display)
        DisableControlAction(0, 322, display)
        DisableControlAction(0, 106, display)
    end
end)

--[[///////////////////        COMMANDS        ///////////////////]]

RegisterCommand("mdt", function(source)

    if vSERVER.checkPermission() then

        SetDisplay(not display)

        if data and next(data) ~= nil then sendInfoToServer(data) end

        SendNUIMessage({
            id = identity,
            name = name,
            firstname = firstname,
            org = org
        })

        TriggerServerEvent("getAllPlayers")
        TriggerServerEvent("getAllOffices")
        TriggerServerEvent("getSelfiePhoto")
    else
        TriggerEvent("Notify", "negado", "Negado!", "Você não é policial!")
    end
end)

RegisterNUICallback("exit", function()
    TriggerEvent("Notify", "Sucesso",
                 "Agradecemos pelo seu serviço em nossa cidade!", 9000)
    SetDisplay(false)
end)

--[[///////////////////        TESTES        ///////////////////]]
