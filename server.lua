ESX = nil

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)


RegisterServerEvent('hud:getServerInfo')
AddEventHandler('hud:getServerInfo', function()
	local source = source
	local xPlayer = ESX.GetPlayerFromId(source)
	local info = {
		money = xPlayer.getMoney(),
		bankMoney = xPlayer.getAccount('bank').money,
        blackMoney = xPlayer.getAccount('black_money').money,
        id = source,
	}
		TriggerClientEvent('hud:setInfo', source, info)
end)