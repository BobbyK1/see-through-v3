SELECT
  p.id AS user_id,
  count(t.id) FILTER (
    WHERE
      (t.status = 'active' :: text)
  ) AS active_transactions_count
FROM
  (
    profiles p
    LEFT JOIN transactions t ON ((p.id = t.user_id))
  )
GROUP BY
  p.id;