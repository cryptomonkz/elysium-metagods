create or replace view tournament_leaderboard as
select ROW_NUMBER() over (order by gte.total_points desc, gte.enrollment_date_time) as rank,
       g.id as god_id,
       g.name as god_name,
       w.address as wallet_address,
       w.nickname as wallet_nickname,
       gte.total_points,
       gte.enrollment_date_time
from god_tournament_enrollment gte
         inner join tournament t on gte.tournament_id = t.id
         inner join god g on gte.god_id = g.id
         left join wallet w on g.owner_id = w.id
where t.active is true;
