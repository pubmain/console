function encodeURIComponent(str)
    return string.gsub(str, "[^%w%-_%.~]", function(c)
        return string.format("%%%02X", string.byte(c))
    end)
end


function generate(name, old)
    return function(...)
        local args = { ... }
    	local _newValue = table.create(#args)
    	for _k, _v in args do
    		_newValue[_k] = tostring(_v, _k - 1, args)
    	end
    	
        local url = "http://localhost:4000/"..name.."?" .. encodeURIComponent(table.concat(_newValue, " "))
    	game:HttpGet(url)
        old(...)
    end
end

local empty = function() end

hookfunction(print, generate("print", empty))
hookfunction(warn, generate("warn", empty))
hookfunction(error, generate("error", empty))
game:HttpGet("http://localhost:4000/info?Connected%20to%20console")
