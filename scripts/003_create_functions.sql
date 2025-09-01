-- Function to get post with engagement stats
CREATE OR REPLACE FUNCTION get_posts_with_stats()
RETURNS TABLE (
  id UUID,
  author_id UUID,
  content TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ,
  author_username TEXT,
  author_display_name TEXT,
  author_avatar_url TEXT,
  likes_count BIGINT,
  comments_count BIGINT,
  user_has_liked BOOLEAN
) 
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    p.id,
    p.author_id,
    p.content,
    p.image_url,
    p.created_at,
    pr.username as author_username,
    pr.display_name as author_display_name,
    pr.avatar_url as author_avatar_url,
    COALESCE(l.likes_count, 0) as likes_count,
    COALESCE(c.comments_count, 0) as comments_count,
    CASE WHEN ul.user_id IS NOT NULL THEN true ELSE false END as user_has_liked
  FROM posts p
  LEFT JOIN profiles pr ON p.author_id = pr.id
  LEFT JOIN (
    SELECT post_id, COUNT(*) as likes_count
    FROM likes
    GROUP BY post_id
  ) l ON p.id = l.post_id
  LEFT JOIN (
    SELECT post_id, COUNT(*) as comments_count
    FROM comments
    GROUP BY post_id
  ) c ON p.id = c.post_id
  LEFT JOIN (
    SELECT post_id, user_id
    FROM likes
    WHERE user_id = auth.uid()
  ) ul ON p.id = ul.post_id
  ORDER BY p.created_at DESC;
$$;
