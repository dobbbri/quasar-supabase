ALTER TABLE categories ALTER COLUMN name TYPE citext;
ALTER TABLE customers ALTER COLUMN name TYPE citext;
ALTER TABLE products ALTER COLUMN name TYPE citext;

create table categories (
  id bigint not null primary key,
  user_id uuid,
  created_at timestamp default now(),
  name extensions.citext,
  inactive boolean
);

create table measure_units (
  id bigint not null primary key,
  user_id uuid,
  created_at timestamp default now(),
  name extensions.citext,
  abbreviation character,
  inactive boolean
);

create table stock_movement (
  id bigint not null primary key,
  user_id uuid,
  created_at timestamp default now(),
  product_id bigint,
  quantity numeric,
  stock_movement_type character
);

create table customers (
  id bigint not null primary key,
  user_id uuid,
  created_at timestamp default now(),
  name extensions.citext,
  phone_1 character,
  phone_2 character,
  document_type character,
  document_number character,
  email character,
  notes text
);

create table store (
  id bigint not null primary key,
  user_id uuid,
  created_at timestamp default now(),
  name character,
  whatsapp character,
  color_primary character,
  color_secundary character,
  url_paralax_image character
);

create table products (
  id bigint not null primary key,
  user_id uuid,
  created_at timestamp default now(),
  name extensions.citext,
  category_id bigint references categories (id),
  price_to_buy numeric,
  price_to_sell numeric,
  stock_is_automatic boolean,
  stock_amount numeric,
  stock_minimum_amount numeric,
  measure_unit_id bigint references measure_units (id),
  code_bar character,
  code_internal character,
  description text,
  image_name character
);

