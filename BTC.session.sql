SELECT *
from tb_btc2017min
WHERE t_date BETWEEN '1900-01-20T01:00:00' AND '1900-01-20T23:59:00'
ORDER BY t_date ASC
LIMIT 100