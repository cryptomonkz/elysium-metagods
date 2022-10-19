drop view loot_box_items_percentage;

create or replace view loot_box_items_percentage as
with loot_box_total_item_weight as
         (select lb.id as lootBoxId, sum(lbi.weight) as totalWeight
          from loot_box_item lbi
                   inner join loot_box lb on lb.id = lbi.loot_box_id
          group by lb.id)
select lb.id                                as lootBoxId,
       lb.name                              as lootBoxName,
       lbi.id                               as lootBoxItemId,
       lbi.name                             as lootBoxItemName,
       lbi.amount_available                 as amountAvailable,
       lbi.weight / lbtiw.totalWeight * 100 as weightPercentage
from loot_box_item lbi
         left join loot_box lb on lbi.loot_box_id = lb.id
         inner join loot_box_total_item_weight lbtiw on lb.id = lbtiw.lootBoxId;
