ESX = nil
loaded = false

Citizen.CreateThread(function()
    while ESX == nil do
        TriggerEvent('esx:getSharedObject', function(obj)
            ESX = obj
        end)
        Citizen.Wait(0)
    end
    loaded = true
    ESX.PlayerData = ESX.GetPlayerData()
end)

function open()
    SendNUIMessage({
        type = "ui",
        status = true,
    })
end

function close()
    SendNUIMessage({
        type = "ui",
        status = false,
    })
end

function setSocBal(money)
    socBal = money
end

local id = 0
local health = 0
local armor = 0
local food = 0
local water = 0
local stamina = 0
local oxygen = 0
local job = ""
local jobgrade = ""
local socBal = 0
local cash = 0
local bank = 0
local black = 0
local isPause = false

Citizen.CreateThread(function()
    while loaded == false do
        Citizen.Wait(20)
    end

    while true do 
        Citizen.Wait(0)
        local ped =  GetPlayerPed(-1)
        local playerId = PlayerId()
        SetPlayerHealthRechargeMultiplier(playerId, 0)
        health = GetEntityHealth(ped)/2
        armor = GetPedArmour(ped)
        stamina = 100 - GetPlayerSprintStaminaRemaining(playerId)
        stamina = math.ceil(stamina)
        oxygen = GetPlayerUnderwaterTimeRemaining(playerId)*10
        oxygen = math.ceil(oxygen)
        SendNUIMessage({
            type = "update",
            id = id,
            health = health,
            armor = armor,
            food = food,
            water = water,
            stamina = stamina,
            oxygen = oxygen,
            job = job,
            jobgrade = jobgrade,
            socBal = socBal,
            cash = cash,
            bank = bank,
            black = black,
        })
    end
end)

Citizen.CreateThread(function()
    while loaded == false do
        Citizen.Wait(20)
    end

    while true do
        Citizen.Wait(1000)
        TriggerEvent('esx_status:getStatus', 'hunger', function(hunger)
            TriggerEvent('esx_status:getStatus', 'thirst', function(thirst)
              food = hunger.getPercent()
              water = thirst.getPercent()
            end)
        end)
    end
end)

Citizen.CreateThread(function()
    while loaded == false do
        Citizen.Wait(20)
    end
    local isPause = false
    while true do
        Citizen.Wait(100)
        
        if IsPauseMenuActive() then 
            isPause = true
            SendNUIMessage({
                type = "ui",
                status = false,
            })
        
        elseif not IsPauseMenuActive() and isPause then
            isPause = false
            SendNUIMessage({
                type = "ui",
                status = true,
            })
        end
    end
end)

Citizen.CreateThread(function()
    while loaded == false do
        Citizen.Wait(20)
    end

    while true do
        Citizen.Wait(3000)
        ESX.PlayerData = ESX.GetPlayerData()
        
        job =  ESX.PlayerData.job.label 
        jobgrade = ESX.PlayerData.job.grade_label

        if ESX.PlayerData.job.grade_name == 'boss' then

            ESX.TriggerServerCallback("esx_society:getSocietyMoney", function(money)
                socBal = money               
            end, ESX.PlayerData.job.name)
            SendNUIMessage({
                type = "isBoss",
                isBoss = true
            })
            
            
        elseif ESX.PlayerData.job.grade_name ~= 'boss' then
            SendNUIMessage({
                type = "isBoss",
                isBoss = false,
            })
        end

        TriggerServerEvent('hud:getServerInfo')
    end
end)




Citizen.CreateThread(function()
    while true do
      Citizen.Wait(0)
      HideHudComponentThisFrame(1)  -- Wanted Stars
      HideHudComponentThisFrame(2)  -- Weapon Icon
      HideHudComponentThisFrame(3)  -- Cash
      HideHudComponentThisFrame(4)  -- MP Cash
      HideHudComponentThisFrame(6)  -- Vehicle Name
      HideHudComponentThisFrame(7)  -- Area Name
      HideHudComponentThisFrame(8)  -- Vehicle Class
      HideHudComponentThisFrame(9)  -- Street Name
      HideHudComponentThisFrame(13) -- Cash Change
      HideHudComponentThisFrame(17) -- Save Game
      HideHudComponentThisFrame(20) -- Weapon Stats
    end
  end)
  

RegisterNetEvent('hud:setInfo')
AddEventHandler('hud:setInfo', function(info)
	cash = info['money']
	bank = info['bankMoney']
    black = info['blackMoney']
    id = info['id']
end)