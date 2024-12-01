import fs from 'fs';
import path from 'path';

const schemaJson = [
  {
    "table_name": "actions",
    "columns": [
      { "name": "description", "type": "string", "nullable": true },
      { "name": "is_enabled", "type": "boolean", "nullable": true },
      { "name": "name", "type": "string", "nullable": false },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "admin_roles",
    "columns": [
      { "name": "name", "type": "string", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "actions", "type": "any", "nullable": true },
      { "name": "azure_ad_id", "type": "any", "nullable": true },
      { "name": "is_enabled", "type": "boolean", "nullable": true }
    ]
  },
  {
    "table_name": "admins",
    "columns": [
      { "name": "name", "type": "string", "nullable": false },
      { "name": "otp_requested_at", "type": "Date", "nullable": true },
      { "name": "access_token", "type": "string", "nullable": true },
      { "name": "password", "type": "string", "nullable": true },
      { "name": "email", "type": "string", "nullable": false },
      { "name": "last_login_date", "type": "Date", "nullable": true },
      { "name": "roles", "type": "any", "nullable": true },
      { "name": "sms_code", "type": "string", "nullable": true },
      { "name": "surname", "type": "string", "nullable": true },
      { "name": "is_enabled", "type": "boolean", "nullable": true },
      { "name": "mobile_phone", "type": "string", "nullable": true },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "app_config_logs",
    "columns": [
      { "name": "json_key", "type": "string", "nullable": true },
      { "name": "apps", "type": "number", "nullable": true },
      { "name": "is_editable", "type": "boolean", "nullable": true },
      { "name": "updated_at", "type": "Date", "nullable": false },
      { "name": "updated_by", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "key", "type": "string", "nullable": false },
      { "name": "value", "type": "string", "nullable": false },
      { "name": "value_type", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "app_configs",
    "columns": [
      { "name": "description", "type": "string", "nullable": true },
      { "name": "value_type", "type": "string", "nullable": true },
      { "name": "display_name", "type": "string", "nullable": true },
      { "name": "name", "type": "string", "nullable": false },
      { "name": "json_key", "type": "string", "nullable": true },
      { "name": "apps", "type": "number", "nullable": true },
      { "name": "is_editable", "type": "boolean", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "value", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "app_delivery_config_logs",
    "columns": [
      { "name": "key", "type": "string", "nullable": false },
      { "name": "value", "type": "string", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "updated_by", "type": "number", "nullable": false },
      { "name": "updated_at", "type": "Date", "nullable": false }
    ]
  },
  {
    "table_name": "app_delivery_configs",
    "columns": [
      { "name": "value", "type": "string", "nullable": true },
      { "name": "name", "type": "string", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "display_name", "type": "string", "nullable": true },
      { "name": "value_type", "type": "string", "nullable": true },
      { "name": "description", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "banned_drivers",
    "columns": [
      { "name": "ban_type", "type": "number", "nullable": true },
      { "name": "updated_date", "type": "Date", "nullable": true },
      { "name": "bulk_action_id", "type": "number", "nullable": true },
      { "name": "ban_note", "type": "string", "nullable": true },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "end_date", "type": "Date", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "ban_by", "type": "number", "nullable": false },
      { "name": "is_active", "type": "boolean", "nullable": false },
      { "name": "tckn", "type": "string", "nullable": true },
      { "name": "mobile_phone", "type": "string", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "tckn_md5", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "banned_drivers_log",
    "columns": [
      { "name": "id", "type": "number", "nullable": false },
      { "name": "is_active", "type": "boolean", "nullable": true },
      { "name": "ban_id", "type": "number", "nullable": false },
      { "name": "end_date", "type": "Date", "nullable": true },
      { "name": "ban_by", "type": "number", "nullable": false },
      { "name": "tckn", "type": "string", "nullable": true },
      { "name": "ban_type", "type": "number", "nullable": true },
      { "name": "ban_note", "type": "string", "nullable": true },
      { "name": "ban_reason", "type": "string", "nullable": true },
      { "name": "mobile_phone", "type": "string", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": false }
    ]
  },
  {
    "table_name": "banned_passengers",
    "columns": [
      { "name": "is_banned", "type": "boolean", "nullable": false },
      { "name": "tckn", "type": "string", "nullable": true },
      { "name": "ban_reason", "type": "string", "nullable": true },
      { "name": "mobile_phone", "type": "string", "nullable": true },
      { "name": "banned_by", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "booking_cancel_reasons",
    "columns": [
      { "name": "id", "type": "number", "nullable": false },
      { "name": "tr_content", "type": "string", "nullable": true },
      { "name": "type", "type": "number", "nullable": false },
      { "name": "en_content", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "booking_delivery_details",
    "columns": [
      { "name": "sender_mobile_phone", "type": "string", "nullable": true },
      {
        "name": "sender_mobile_phone_country_code",
        "type": "string",
        "nullable": true
      },
      { "name": "sender_surname", "type": "string", "nullable": true },
      { "name": "update_date", "type": "Date", "nullable": true },
      { "name": "ask_pin", "type": "boolean", "nullable": true },
      { "name": "sender_name", "type": "string", "nullable": true },
      { "name": "is_sender", "type": "boolean", "nullable": true },
      { "name": "created_at", "type": "Date", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "receiver_mobile_phone", "type": "string", "nullable": true },
      {
        "name": "receiver_mobile_phone_country_code",
        "type": "string",
        "nullable": true
      },
      { "name": "receiver_surname", "type": "string", "nullable": true },
      { "name": "receiver_name", "type": "string", "nullable": true },
      { "name": "pin_code", "type": "string", "nullable": true },
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "passenger_id", "type": "number", "nullable": false },
      { "name": "receiver_courier_note", "type": "string", "nullable": true },
      { "name": "sender_courier_note", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "booking_discount_details",
    "columns": [
      { "name": "discount_type", "type": "number", "nullable": true },
      { "name": "total_amount", "type": "number", "nullable": true },
      { "name": "reward_type", "type": "number", "nullable": true },
      { "name": "passenger_id", "type": "number", "nullable": true },
      { "name": "expire_date", "type": "Date", "nullable": true },
      { "name": "promo_code", "type": "string", "nullable": true },
      { "name": "description", "type": "string", "nullable": true },
      { "name": "title", "type": "string", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "discount_id", "type": "number", "nullable": true },
      { "name": "discount_price", "type": "number", "nullable": true },
      { "name": "discounted_amount", "type": "number", "nullable": true },
      { "name": "booking_id", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "booking_log_status",
    "columns": [
      { "name": "name", "type": "string", "nullable": true },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "booking_logs",
    "columns": [
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "status", "type": "number", "nullable": false },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "match_distance", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "driver_location", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "booking_matching_batch_logs",
    "columns": [
      { "name": "response_date", "type": "Date", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "matched_driver_id", "type": "number", "nullable": false },
      {
        "name": "option_num_drivers_per_booking",
        "type": "number",
        "nullable": false
      },
      {
        "name": "option_max_matching_radius",
        "type": "number",
        "nullable": false
      },
      { "name": "response_driver_list", "type": "string", "nullable": true },
      { "name": "group_id", "type": "any", "nullable": false },
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": false }
    ]
  },
  {
    "table_name": "booking_matching_log_v2",
    "columns": [
      { "name": "matched_drivers", "type": "string", "nullable": true },
      { "name": "forbidden_drivers", "type": "string", "nullable": true },
      { "name": "message", "type": "string", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "driver_count", "type": "number", "nullable": true },
      { "name": "is_success", "type": "boolean", "nullable": false },
      { "name": "error_code", "type": "number", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "request_id", "type": "string", "nullable": false }
    ]
  },
  {
    "table_name": "booking_obstruction_points",
    "columns": [
      { "name": "to_stop", "type": "number", "nullable": true },
      { "name": "point_id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "type", "type": "number", "nullable": false },
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "point", "type": "string", "nullable": false },
      { "name": "area_point", "type": "string", "nullable": false },
      { "name": "avoid_points", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "booking_passenger_location_logs",
    "columns": [
      { "name": "latitude", "type": "number", "nullable": false },
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "booking_status", "type": "number", "nullable": false },
      { "name": "longitude", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "booking_payment_details",
    "columns": [
      { "name": "passenger_ip_address", "type": "string", "nullable": true },
      { "name": "last_four_digits", "type": "string", "nullable": true },
      { "name": "card_provider", "type": "number", "nullable": true },
      { "name": "commision_rate", "type": "number", "nullable": true },
      { "name": "is_active", "type": "boolean", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "card_id", "type": "number", "nullable": true },
      { "name": "payment_type", "type": "number", "nullable": true },
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "card_label", "type": "string", "nullable": true },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "booking_payment_request",
    "columns": [
      { "name": "id", "type": "number", "nullable": false },
      { "name": "updated_date", "type": "Date", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "status", "type": "number", "nullable": true },
      { "name": "card_id", "type": "number", "nullable": true },
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "conversation_id", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "booking_payments",
    "columns": [
      { "name": "payment_id", "type": "string", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "passenger_id", "type": "number", "nullable": false },
      { "name": "card_id", "type": "number", "nullable": false },
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "conversation_id", "type": "string", "nullable": false },
      { "name": "payment_transaction_id", "type": "string", "nullable": false }
    ]
  },
  {
    "table_name": "booking_route_history",
    "columns": [
      { "name": "updated_date", "type": "Date", "nullable": true },
      { "name": "depreciation_price", "type": "number", "nullable": true },
      { "name": "estimated_price", "type": "number", "nullable": true },
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "duration", "type": "number", "nullable": true },
      { "name": "distance", "type": "number", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "polyline_points", "type": "string", "nullable": true },
      { "name": "state", "type": "number", "nullable": false },
      { "name": "oil_price", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "booking_state_logs",
    "columns": [
      { "name": "to_status", "type": "number", "nullable": false },
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "from_status", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "booking_status",
    "columns": [
      { "name": "name", "type": "string", "nullable": true },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "booking_stop_points",
    "columns": [
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "stop_type", "type": "number", "nullable": true },
      { "name": "state", "type": "number", "nullable": true },
      { "name": "estimated_time", "type": "number", "nullable": true },
      { "name": "estimated_distance", "type": "number", "nullable": true },
      { "name": "updated_date", "type": "Date", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "is_arrived", "type": "boolean", "nullable": true },
      { "name": "list_order", "type": "number", "nullable": false },
      {
        "name": "booking_route_history_id",
        "type": "number",
        "nullable": true
      },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "place_id", "type": "string", "nullable": true },
      { "name": "polyline_points", "type": "string", "nullable": true },
      { "name": "point", "type": "string", "nullable": false },
      { "name": "arrived_at", "type": "Date", "nullable": true },
      { "name": "estimated_price", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "booking_surge_details",
    "columns": [
      { "name": "marker_color", "type": "string", "nullable": true },
      { "name": "vehicle_type", "type": "number", "nullable": false },
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "is_used", "type": "boolean", "nullable": false },
      { "name": "surge_rate", "type": "number", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "surge_multiplier", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "booking_vehicle_option_logs",
    "columns": [
      { "name": "vehicle_type", "type": "number", "nullable": true },
      { "name": "driver_id", "type": "number", "nullable": true },
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "price", "type": "number", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "estimated_distance", "type": "number", "nullable": true },
      { "name": "duration", "type": "number", "nullable": true },
      { "name": "depreciation_price", "type": "number", "nullable": true },
      { "name": "oil_price", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "booking_waypoints",
    "columns": [
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "to_stop", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "waypoint_id", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "bookings",
    "columns": [
      { "name": "subfence_id", "type": "number", "nullable": true },
      { "name": "vehicle_id", "type": "number", "nullable": true },
      { "name": "pickup_route", "type": "string", "nullable": true },
      { "name": "driver_end_place_id", "type": "string", "nullable": true },
      { "name": "driver_start_place_id", "type": "string", "nullable": true },
      { "name": "polyline_points", "type": "string", "nullable": true },
      { "name": "code", "type": "string", "nullable": true },
      { "name": "destination", "type": "string", "nullable": true },
      { "name": "origin", "type": "string", "nullable": true },
      { "name": "end_location", "type": "string", "nullable": false },
      { "name": "start_location", "type": "string", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "passenger_id", "type": "number", "nullable": false },
      { "name": "driver_id", "type": "number", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "update_date", "type": "Date", "nullable": true },
      { "name": "status", "type": "number", "nullable": true },
      { "name": "estimated_distance", "type": "number", "nullable": true },
      { "name": "estimated_price", "type": "number", "nullable": true },
      { "name": "duration", "type": "number", "nullable": true },
      { "name": "payment_type", "type": "number", "nullable": true },
      { "name": "oil_price", "type": "number", "nullable": true },
      { "name": "depreciation_price", "type": "number", "nullable": true },
      { "name": "vehicle_type", "type": "number", "nullable": true },
      { "name": "passenger_offer_price", "type": "number", "nullable": true },
      { "name": "estimated_match_time", "type": "number", "nullable": true },
      {
        "name": "estimated_match_distance",
        "type": "number",
        "nullable": true
      },
      {
        "name": "estimated_direct_match_distance",
        "type": "number",
        "nullable": true
      },
      { "name": "cancel_reason", "type": "number", "nullable": true },
      { "name": "matching_distance", "type": "number", "nullable": true },
      { "name": "type", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "brands",
    "columns": [
      { "name": "name", "type": "string", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "type", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "call_center_options",
    "columns": [
      { "name": "opt_value", "type": "string", "nullable": true },
      { "name": "created_at", "type": "Date", "nullable": false },
      { "name": "opt_key", "type": "string", "nullable": false },
      { "name": "is_deleted", "type": "boolean", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "is_active", "type": "boolean", "nullable": false },
      { "name": "opt_text_tr", "type": "string", "nullable": true },
      { "name": "opt_group", "type": "string", "nullable": false }
    ]
  },
  {
    "table_name": "call_center_records",
    "columns": [
      { "name": "solution_categories", "type": "any", "nullable": true },
      { "name": "updated_by", "type": "number", "nullable": true },
      { "name": "updated_at", "type": "Date", "nullable": true },
      { "name": "created_by", "type": "number", "nullable": true },
      { "name": "created_at", "type": "Date", "nullable": false },
      { "name": "tag", "type": "number", "nullable": true },
      { "name": "status", "type": "number", "nullable": false },
      { "name": "solution_category", "type": "number", "nullable": true },
      { "name": "solution_id", "type": "number", "nullable": true },
      { "name": "user_id", "type": "number", "nullable": false },
      { "name": "user_type", "type": "number", "nullable": false },
      { "name": "record_finished_at", "type": "Date", "nullable": true },
      { "name": "record_started_at", "type": "Date", "nullable": true },
      { "name": "record_duration", "type": "number", "nullable": true },
      { "name": "record_owner_id", "type": "number", "nullable": true },
      { "name": "record_type", "type": "number", "nullable": true },
      { "name": "role_id", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "queue_name", "type": "string", "nullable": true },
      { "name": "note", "type": "string", "nullable": true },
      { "name": "record_owner", "type": "string", "nullable": true },
      { "name": "sub_status", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "call_center_records_logs",
    "columns": [
      { "name": "log_by", "type": "number", "nullable": true },
      { "name": "note", "type": "string", "nullable": true },
      { "name": "status", "type": "number", "nullable": true },
      { "name": "log_at", "type": "Date", "nullable": true },
      { "name": "tag", "type": "number", "nullable": true },
      { "name": "sub_status", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "record_id", "type": "number", "nullable": true },
      { "name": "solution_categories", "type": "any", "nullable": true },
      { "name": "record_started_at", "type": "Date", "nullable": true },
      { "name": "record_finished_at", "type": "Date", "nullable": true },
      { "name": "role_id", "type": "number", "nullable": true },
      { "name": "solution_category", "type": "number", "nullable": true },
      { "name": "record_duration", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "calls",
    "columns": [
      { "name": "caller", "type": "string", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "type", "type": "number", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "callee_id", "type": "number", "nullable": true },
      { "name": "caller_id", "type": "number", "nullable": true },
      { "name": "caller_type", "type": "number", "nullable": true },
      { "name": "processed", "type": "boolean", "nullable": true },
      { "name": "callee", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "chat_messages",
    "columns": [
      { "name": "is_reported", "type": "boolean", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "message", "type": "string", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "chat_id", "type": "number", "nullable": false },
      { "name": "sender", "type": "number", "nullable": false },
      { "name": "is_send", "type": "boolean", "nullable": true },
      { "name": "is_read", "type": "boolean", "nullable": true }
    ]
  },
  {
    "table_name": "chats",
    "columns": [
      { "name": "is_active", "type": "boolean", "nullable": false },
      { "name": "passenger_id", "type": "number", "nullable": false },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "updated_date", "type": "Date", "nullable": true },
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "colors",
    "columns": [
      { "name": "created_at", "type": "Date", "nullable": true },
      { "name": "created_at_tzone", "type": "Date", "nullable": true },
      { "name": "name", "type": "string", "nullable": false },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "coupons",
    "columns": [
      { "name": "code", "type": "string", "nullable": false },
      { "name": "is_enabled", "type": "boolean", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "assign_date", "type": "Date", "nullable": true },
      { "name": "driver_id", "type": "number", "nullable": true },
      { "name": "reward_id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "courier_statistic_definitions",
    "columns": [
      { "name": "max_val", "type": "number", "nullable": false },
      { "name": "description", "type": "string", "nullable": false },
      { "name": "type", "type": "number", "nullable": false },
      { "name": "min_val", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "couriers",
    "columns": [
      { "name": "vkn", "type": "string", "nullable": true },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "update_date", "type": "Date", "nullable": true },
      { "name": "created_at", "type": "Date", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "score", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "delivery_geofences",
    "columns": [
      { "name": "is_active", "type": "boolean", "nullable": true },
      { "name": "name", "type": "string", "nullable": true },
      { "name": "polygon", "type": "string", "nullable": true },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "driver_address",
    "columns": [
      { "name": "address", "type": "string", "nullable": true },
      { "name": "is_active", "type": "boolean", "nullable": true },
      { "name": "district", "type": "string", "nullable": true },
      { "name": "city", "type": "string", "nullable": true },
      { "name": "neighborhood", "type": "string", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "created_at", "type": "Date", "nullable": true }
    ]
  },
  {
    "table_name": "driver_anonymize_log",
    "columns": [
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "admin_id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "driver_ban_reasons",
    "columns": [
      { "name": "push_title_tr", "type": "string", "nullable": true },
      { "name": "is_active", "type": "boolean", "nullable": true },
      { "name": "parent_id", "type": "number", "nullable": true },
      { "name": "is_push_enabled", "type": "boolean", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "reason", "type": "string", "nullable": true },
      { "name": "push_text_tr", "type": "string", "nullable": true },
      { "name": "push_title_en", "type": "string", "nullable": true },
      { "name": "push_text_en", "type": "string", "nullable": true },
      { "name": "tag", "type": "any", "nullable": true },
      { "name": "po_key_limited", "type": "string", "nullable": true },
      { "name": "po_key_limitless", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "driver_bulk_actions",
    "columns": [
      { "name": "admin_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "created_at", "type": "Date", "nullable": true },
      { "name": "action_type", "type": "string", "nullable": false }
    ]
  },
  {
    "table_name": "driver_campaigns",
    "columns": [
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "created_at", "type": "Date", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "reward_id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "driver_company_details",
    "columns": [
      { "name": "approved_date", "type": "Date", "nullable": true },
      { "name": "tax_office", "type": "number", "nullable": true },
      { "name": "vkn", "type": "string", "nullable": false },
      { "name": "admin_id", "type": "number", "nullable": true },
      { "name": "status", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "driver_start_date", "type": "Date", "nullable": true },
      { "name": "updated_date", "type": "Date", "nullable": true },
      { "name": "tax_certificate", "type": "string", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "tax_type", "type": "number", "nullable": true },
      { "name": "reject_reason", "type": "number", "nullable": true },
      { "name": "company_name", "type": "string", "nullable": false }
    ]
  },
  {
    "table_name": "driver_company_reject_reasons",
    "columns": [
      { "name": "push_text_en", "type": "string", "nullable": true },
      { "name": "push_title_en", "type": "string", "nullable": true },
      { "name": "push_text_tr", "type": "string", "nullable": true },
      { "name": "push_title_tr", "type": "string", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "is_push_enabled", "type": "boolean", "nullable": false },
      { "name": "reason", "type": "string", "nullable": false },
      { "name": "is_active", "type": "boolean", "nullable": true }
    ]
  },
  {
    "table_name": "driver_conversation_notes",
    "columns": [
      { "name": "note", "type": "string", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "admin_id", "type": "number", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "type", "type": "number", "nullable": true },
      { "name": "is_enable", "type": "boolean", "nullable": false },
      { "name": "bulk_action_id", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "driver_credit_cards",
    "columns": [
      { "name": "card_token", "type": "any", "nullable": false },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "created_at", "type": "Date", "nullable": false },
      { "name": "is_default", "type": "boolean", "nullable": false },
      { "name": "is_active", "type": "boolean", "nullable": false },
      { "name": "card_name", "type": "string", "nullable": false },
      { "name": "last_digits", "type": "string", "nullable": false }
    ]
  },
  {
    "table_name": "driver_delete_requests",
    "columns": [
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "created_at", "type": "Date", "nullable": false },
      { "name": "updated_at", "type": "Date", "nullable": true },
      { "name": "updated_by", "type": "number", "nullable": true },
      { "name": "is_processed", "type": "boolean", "nullable": false }
    ]
  },
  {
    "table_name": "driver_destination_history",
    "columns": [
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "destination", "type": "string", "nullable": false },
      { "name": "created_at", "type": "Date", "nullable": true },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "driver_earnings",
    "columns": [
      { "name": "amount", "type": "number", "nullable": false },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "type", "type": "number", "nullable": false },
      { "name": "earning_status", "type": "number", "nullable": false },
      { "name": "batch_id", "type": "string", "nullable": true },
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "driver_earnings_status",
    "columns": [
      { "name": "id", "type": "number", "nullable": false },
      { "name": "name", "type": "string", "nullable": false }
    ]
  },
  {
    "table_name": "driver_earnings_transfers",
    "columns": [
      { "name": "amount", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "transfer_status", "type": "number", "nullable": false },
      { "name": "confirmation_id", "type": "number", "nullable": true },
      { "name": "cash_amount", "type": "number", "nullable": true },
      { "name": "credit_card_amount", "type": "number", "nullable": true },
      { "name": "fine_amount", "type": "number", "nullable": true },
      { "name": "commission_amount", "type": "number", "nullable": true },
      { "name": "updated_date", "type": "Date", "nullable": true },
      { "name": "cash_count", "type": "number", "nullable": true },
      { "name": "credit_card_count", "type": "number", "nullable": true },
      { "name": "is_blocked", "type": "boolean", "nullable": true },
      { "name": "retry_count", "type": "number", "nullable": true },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "promotion_amount", "type": "number", "nullable": true },
      { "name": "sap_error_desc", "type": "string", "nullable": true },
      { "name": "batch_id", "type": "string", "nullable": true },
      { "name": "retry_batch_id", "type": "string", "nullable": true },
      { "name": "conversation_id", "type": "string", "nullable": true },
      { "name": "iban", "type": "string", "nullable": true },
      { "name": "sap_id", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "driver_earnings_transfers_confirmations",
    "columns": [
      { "name": "approved_by", "type": "number", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "approved_at", "type": "Date", "nullable": true },
      { "name": "is_approved", "type": "boolean", "nullable": false },
      { "name": "total_transfer_amount", "type": "number", "nullable": false },
      { "name": "total_transfer_count", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "commission_amount", "type": "number", "nullable": true },
      { "name": "blocked_amount", "type": "number", "nullable": true },
      { "name": "cash_count", "type": "number", "nullable": true },
      { "name": "credit_card_count", "type": "number", "nullable": true },
      { "name": "promotion_amount", "type": "number", "nullable": true },
      { "name": "fine_amount", "type": "number", "nullable": true },
      { "name": "credit_card_amount", "type": "number", "nullable": true },
      { "name": "cash_amount", "type": "number", "nullable": true },
      { "name": "status", "type": "number", "nullable": true },
      { "name": "approve_version", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "driver_earnings_transfers_error_logs",
    "columns": [
      {
        "name": "driver_earnings_transfer_id",
        "type": "number",
        "nullable": false
      },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "transfer_status", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "retry_batch_id", "type": "string", "nullable": true },
      { "name": "bulut_status_desc", "type": "string", "nullable": true },
      { "name": "sap_transfer_status", "type": "string", "nullable": true },
      { "name": "bulut_status_code", "type": "string", "nullable": true },
      { "name": "sap_id", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "driver_earnings_transfers_status",
    "columns": [
      { "name": "id", "type": "number", "nullable": false },
      { "name": "name", "type": "string", "nullable": false }
    ]
  },
  {
    "table_name": "driver_ibans",
    "columns": [
      { "name": "updated_date", "type": "Date", "nullable": false },
      { "name": "iban", "type": "string", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "is_enabled", "type": "boolean", "nullable": false }
    ]
  },
  {
    "table_name": "driver_issues",
    "columns": [
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "description", "type": "string", "nullable": true },
      { "name": "booking_id", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "trip_id", "type": "number", "nullable": true },
      { "name": "type", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "driver_iys_permissions",
    "columns": [
      { "name": "id", "type": "number", "nullable": false },
      { "name": "driver_id", "type": "number", "nullable": true },
      { "name": "sms_permission", "type": "boolean", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "email_permission", "type": "boolean", "nullable": true },
      { "name": "call_permission", "type": "boolean", "nullable": true }
    ]
  },
  {
    "table_name": "driver_marker_routes",
    "columns": [
      { "name": "id", "type": "number", "nullable": false },
      { "name": "route", "type": "string", "nullable": true },
      { "name": "start_point", "type": "string", "nullable": false },
      { "name": "is_weekend", "type": "boolean", "nullable": true },
      { "name": "booking_type", "type": "number", "nullable": false },
      { "name": "day_of_week", "type": "number", "nullable": true },
      { "name": "hour_of_day", "type": "number", "nullable": true },
      { "name": "vehicle_type", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "driver_mobile_phone_update_logs",
    "columns": [
      { "name": "old_phone_number", "type": "string", "nullable": true },
      { "name": "new_phone_number", "type": "string", "nullable": true },
      { "name": "change_date", "type": "Date", "nullable": true },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "driver_notifications",
    "columns": [
      { "name": "title", "type": "string", "nullable": true },
      { "name": "text", "type": "string", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "admin_id", "type": "number", "nullable": true },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "is_read", "type": "boolean", "nullable": false },
      { "name": "read_date", "type": "Date", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": false }
    ]
  },
  {
    "table_name": "driver_payments",
    "columns": [
      { "name": "credit_card_id", "type": "string", "nullable": false },
      { "name": "amount", "type": "number", "nullable": false },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "update_date", "type": "Date", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "status", "type": "number", "nullable": false },
      { "name": "request_id", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "driver_refunds",
    "columns": [
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "request_id", "type": "string", "nullable": true },
      { "name": "credit_card_id", "type": "string", "nullable": false },
      { "name": "update_date", "type": "Date", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "status", "type": "number", "nullable": false },
      { "name": "amount", "type": "number", "nullable": false },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "driver_registration_logs",
    "columns": [
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "reject_reasons", "type": "any", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "to_state", "type": "number", "nullable": false },
      { "name": "from_state", "type": "number", "nullable": false },
      { "name": "admin_id", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "driver_reject_reasons",
    "columns": [
      { "name": "push_text_tr", "type": "string", "nullable": true },
      { "name": "push_title_en", "type": "string", "nullable": true },
      { "name": "is_push_enabled", "type": "boolean", "nullable": false },
      { "name": "push_text_en", "type": "string", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "parent_id", "type": "number", "nullable": true },
      { "name": "is_active", "type": "boolean", "nullable": true },
      { "name": "sort", "type": "number", "nullable": false },
      { "name": "reason", "type": "string", "nullable": false },
      { "name": "push_title_tr", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "driver_rewards",
    "columns": [
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "created_at", "type": "Date", "nullable": true },
      { "name": "is_send", "type": "boolean", "nullable": true },
      { "name": "address_id", "type": "number", "nullable": true },
      { "name": "reward_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "driver_selfies",
    "columns": [
      { "name": "is_approved", "type": "boolean", "nullable": true },
      { "name": "confidence", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "approver", "type": "number", "nullable": true },
      { "name": "selfie", "type": "string", "nullable": false },
      { "name": "uploaded_date", "type": "Date", "nullable": true },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "approved_date", "type": "Date", "nullable": true }
    ]
  },
  {
    "table_name": "driver_state_logs",
    "columns": [
      { "name": "type", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "state", "type": "number", "nullable": false },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "ts", "type": "Date", "nullable": false },
      { "name": "location", "type": "string", "nullable": true },
      { "name": "active_vehicle_id", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "driver_statistic_definitions",
    "columns": [
      { "name": "type", "type": "number", "nullable": false },
      { "name": "description", "type": "string", "nullable": false },
      { "name": "max_val", "type": "number", "nullable": false },
      { "name": "min_val", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "drivers",
    "columns": [
      {
        "name": "mobile_phone_country_code",
        "type": "string",
        "nullable": true
      },
      { "name": "on_site_date", "type": "Date", "nullable": true },
      { "name": "on_site_location", "type": "number", "nullable": true },
      { "name": "created_at", "type": "Date", "nullable": true },
      {
        "name": "registration_reject_reason",
        "type": "number",
        "nullable": true
      },
      { "name": "updated_date", "type": "Date", "nullable": true },
      { "name": "registration_state", "type": "number", "nullable": true },
      { "name": "is_valid", "type": "boolean", "nullable": true },
      { "name": "otp_requested_at", "type": "Date", "nullable": true },
      { "name": "is_enabled", "type": "boolean", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "last_login_date", "type": "Date", "nullable": true },
      { "name": "birth_date", "type": "Date", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "score", "type": "number", "nullable": true },
      { "name": "reject_reasons", "type": "any", "nullable": true },
      { "name": "enable_mode", "type": "number", "nullable": true },
      { "name": "charge_commission", "type": "boolean", "nullable": true },
      {
        "name": "super_member_popup_shown",
        "type": "boolean",
        "nullable": true
      },
      { "name": "passenger_id", "type": "number", "nullable": true },
      { "name": "is_iys_enabled", "type": "boolean", "nullable": true },
      { "name": "uuid", "type": "any", "nullable": true },
      { "name": "name", "type": "string", "nullable": true },
      { "name": "trip_count", "type": "number", "nullable": true },
      { "name": "surname", "type": "string", "nullable": true },
      { "name": "email", "type": "string", "nullable": true },
      { "name": "tckn", "type": "string", "nullable": true },
      { "name": "one_signal_id", "type": "string", "nullable": true },
      { "name": "mobile_phone", "type": "string", "nullable": true },
      { "name": "access_token", "type": "string", "nullable": true },
      { "name": "sms_code", "type": "string", "nullable": true },
      { "name": "destination", "type": "string", "nullable": true },
      { "name": "selfie", "type": "string", "nullable": true },
      { "name": "city", "type": "string", "nullable": true },
      { "name": "tckn_md5", "type": "string", "nullable": true },
      { "name": "language", "type": "string", "nullable": true },
      { "name": "pass_photo", "type": "string", "nullable": true },
      { "name": "driver_license", "type": "string", "nullable": true },
      { "name": "criminal", "type": "string", "nullable": true },
      { "name": "integration_id", "type": "string", "nullable": true },
      { "name": "location", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "fraud_exception_surnames",
    "columns": [
      { "name": "surname", "type": "string", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "geofence_delivery_pricing",
    "columns": [
      { "name": "is_active", "type": "boolean", "nullable": true },
      { "name": "min_price", "type": "number", "nullable": true },
      { "name": "oil_price_per_km", "type": "number", "nullable": true },
      { "name": "fence_id", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "price_per_km", "type": "number", "nullable": true },
      { "name": "start_price", "type": "number", "nullable": true },
      { "name": "vehicle_type", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "geofence_hourly_multipliers",
    "columns": [
      { "name": "created_at", "type": "Date", "nullable": false },
      { "name": "updated_by", "type": "number", "nullable": true },
      { "name": "updated_at", "type": "Date", "nullable": true },
      { "name": "day_of_week", "type": "number", "nullable": false },
      { "name": "vehicle_type", "type": "number", "nullable": false },
      { "name": "geofence_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "value", "type": "number", "nullable": true },
      { "name": "hour", "type": "number", "nullable": false },
      { "name": "created_by", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "geofence_hourly_multipliers_log",
    "columns": [
      { "name": "id", "type": "number", "nullable": false },
      { "name": "vehicle_type", "type": "number", "nullable": false },
      { "name": "geofence_id", "type": "number", "nullable": false },
      { "name": "created_by", "type": "number", "nullable": false },
      { "name": "day_of_week", "type": "number", "nullable": false },
      { "name": "created_at", "type": "Date", "nullable": false },
      { "name": "new_value", "type": "number", "nullable": true },
      { "name": "old_value", "type": "number", "nullable": true },
      { "name": "hour", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "geofence_logs",
    "columns": [
      {
        "name": "is_credit_card_mandatory",
        "type": "boolean",
        "nullable": true
      },
      { "name": "is_active", "type": "boolean", "nullable": true },
      { "name": "min_tag_trip", "type": "number", "nullable": true },
      { "name": "change_type", "type": "number", "nullable": false },
      { "name": "admin_id", "type": "number", "nullable": false },
      { "name": "geofence_id", "type": "number", "nullable": false },
      { "name": "name", "type": "string", "nullable": true },
      { "name": "polygon", "type": "string", "nullable": true },
      { "name": "updated_date", "type": "Date", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "min_marti_ride", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "geofence_multipliers",
    "columns": [
      { "name": "updated_by", "type": "number", "nullable": true },
      { "name": "fence_id", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "vehicle_type", "type": "number", "nullable": true },
      { "name": "is_enabled", "type": "boolean", "nullable": true },
      { "name": "updated_at", "type": "Date", "nullable": true }
    ]
  },
  {
    "table_name": "geofence_pricing",
    "columns": [
      { "name": "is_active", "type": "boolean", "nullable": true },
      { "name": "fence_id", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "commission_rate", "type": "number", "nullable": true },
      { "name": "price_per_duration", "type": "number", "nullable": true },
      { "name": "min_price", "type": "number", "nullable": true },
      { "name": "price_per_km", "type": "number", "nullable": true },
      { "name": "start_price", "type": "number", "nullable": true },
      { "name": "oil_price_per_km", "type": "number", "nullable": true },
      { "name": "vehicle_type", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "geofence_pricing_logs",
    "columns": [
      { "name": "fence_id", "type": "number", "nullable": true },
      { "name": "updated_date", "type": "Date", "nullable": true },
      { "name": "min_price", "type": "number", "nullable": true },
      { "name": "change_type", "type": "number", "nullable": false },
      { "name": "admin_id", "type": "number", "nullable": false },
      { "name": "geofence_pricing_id", "type": "number", "nullable": false },
      { "name": "vehicle_type", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "oil_price_per_km", "type": "number", "nullable": true },
      { "name": "start_price", "type": "number", "nullable": true },
      { "name": "price_per_km", "type": "number", "nullable": true },
      { "name": "is_active", "type": "boolean", "nullable": true }
    ]
  },
  {
    "table_name": "geofences",
    "columns": [
      { "name": "polygon", "type": "string", "nullable": true },
      { "name": "name", "type": "string", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "is_active", "type": "boolean", "nullable": true },
      {
        "name": "is_credit_card_mandatory",
        "type": "boolean",
        "nullable": true
      },
      { "name": "min_marti_ride", "type": "number", "nullable": true },
      { "name": "min_tag_trip", "type": "number", "nullable": true },
      {
        "name": "is_geofence_multiplier_active",
        "type": "boolean",
        "nullable": true
      }
    ]
  },
  {
    "table_name": "geography_columns",
    "columns": [
      { "name": "type", "type": "string", "nullable": true },
      { "name": "srid", "type": "number", "nullable": true },
      { "name": "coord_dimension", "type": "number", "nullable": true },
      { "name": "f_table_name", "type": "any", "nullable": true },
      { "name": "f_table_schema", "type": "any", "nullable": true },
      { "name": "f_geography_column", "type": "any", "nullable": true },
      { "name": "f_table_catalog", "type": "any", "nullable": true }
    ]
  },
  {
    "table_name": "geometry_columns",
    "columns": [
      { "name": "f_table_name", "type": "any", "nullable": true },
      { "name": "coord_dimension", "type": "number", "nullable": true },
      { "name": "srid", "type": "number", "nullable": true },
      { "name": "type", "type": "string", "nullable": true },
      { "name": "f_geometry_column", "type": "any", "nullable": true },
      { "name": "f_table_catalog", "type": "string", "nullable": true },
      { "name": "f_table_schema", "type": "any", "nullable": true }
    ]
  },
  {
    "table_name": "invalid_login_attempts",
    "columns": [
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "device_id", "type": "string", "nullable": true },
      { "name": "otp", "type": "string", "nullable": true },
      { "name": "ts", "type": "Date", "nullable": true },
      { "name": "ip_address", "type": "string", "nullable": true },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "invites",
    "columns": [
      { "name": "is_earned", "type": "boolean", "nullable": false },
      { "name": "invite_date", "type": "Date", "nullable": false },
      { "name": "reward_id", "type": "number", "nullable": true },
      { "name": "mobile_phone", "type": "string", "nullable": false },
      { "name": "invitor_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "valid_until", "type": "Date", "nullable": true },
      { "name": "type", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "invoices",
    "columns": [
      { "name": "invoice_date", "type": "Date", "nullable": false },
      { "name": "response", "type": "string", "nullable": true },
      { "name": "is_cancelled", "type": "boolean", "nullable": true },
      { "name": "scenario", "type": "string", "nullable": true },
      { "name": "pdf_ready", "type": "boolean", "nullable": true },
      { "name": "processed_date", "type": "Date", "nullable": true },
      { "name": "customer_id", "type": "number", "nullable": true },
      { "name": "charged_price", "type": "number", "nullable": true },
      { "name": "ref_id", "type": "string", "nullable": true },
      { "name": "is_processed", "type": "boolean", "nullable": false },
      { "name": "real_invoice_id", "type": "string", "nullable": true },
      { "name": "cancelled_date", "type": "Date", "nullable": true },
      { "name": "provider_type", "type": "number", "nullable": true },
      { "name": "address_id", "type": "number", "nullable": true },
      { "name": "provider_id", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "landing_banners",
    "columns": [
      { "name": "reward_id", "type": "number", "nullable": true },
      { "name": "sub_domain", "type": "number", "nullable": true },
      { "name": "image", "type": "string", "nullable": true },
      { "name": "type", "type": "number", "nullable": false },
      { "name": "is_active", "type": "boolean", "nullable": true },
      { "name": "image_en", "type": "string", "nullable": true },
      { "name": "domain", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "order_no", "type": "number", "nullable": false },
      { "name": "marti_campaign_id", "type": "number", "nullable": true },
      { "name": "expiry_date", "type": "Date", "nullable": true },
      { "name": "geofences", "type": "any", "nullable": true },
      { "name": "vehicle_type", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "landing_options",
    "columns": [
      { "name": "button_tr", "type": "string", "nullable": false },
      { "name": "button_en", "type": "string", "nullable": false },
      { "name": "domain", "type": "number", "nullable": true },
      { "name": "is_active", "type": "boolean", "nullable": true },
      { "name": "order_no", "type": "number", "nullable": false },
      { "name": "content_en", "type": "string", "nullable": false },
      { "name": "content_tr", "type": "string", "nullable": false },
      { "name": "sub_domain", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "login_logs",
    "columns": [
      { "name": "id", "type": "number", "nullable": false },
      { "name": "language", "type": "string", "nullable": true },
      { "name": "user_type", "type": "string", "nullable": false },
      { "name": "access_token", "type": "string", "nullable": false },
      { "name": "otp_code", "type": "string", "nullable": true },
      { "name": "vendor_id", "type": "string", "nullable": true },
      { "name": "user_id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "user_agent", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "models",
    "columns": [
      { "name": "brand_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "segment", "type": "number", "nullable": true },
      { "name": "name", "type": "string", "nullable": false }
    ]
  },
  {
    "table_name": "obstruction_calls",
    "columns": [
      { "name": "is_finished", "type": "boolean", "nullable": true },
      { "name": "is_answerd", "type": "boolean", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "created_by", "type": "number", "nullable": true },
      { "name": "trip_id", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "notes", "type": "string", "nullable": true },
      { "name": "obstruction_name", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "obstruction_points",
    "columns": [
      { "name": "send_zeus", "type": "boolean", "nullable": true },
      { "name": "is_archived", "type": "boolean", "nullable": true },
      { "name": "vehicle_types", "type": "any", "nullable": true },
      { "name": "area_point", "type": "string", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "created_by", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      {
        "name": "point_obstacle_percentage",
        "type": "number",
        "nullable": true
      },
      { "name": "type", "type": "number", "nullable": false },
      { "name": "name", "type": "string", "nullable": true },
      { "name": "avoid_points", "type": "string", "nullable": true },
      { "name": "is_active", "type": "boolean", "nullable": false },
      { "name": "point", "type": "string", "nullable": false }
    ]
  },
  {
    "table_name": "obstruction_points_log",
    "columns": [
      { "name": "vehicle_types", "type": "any", "nullable": true },
      { "name": "name", "type": "string", "nullable": true },
      { "name": "area_points", "type": "any", "nullable": false },
      { "name": "point", "type": "string", "nullable": false },
      { "name": "is_archived", "type": "boolean", "nullable": true },
      { "name": "send_zeus", "type": "boolean", "nullable": true },
      {
        "name": "point_obstacle_percentage",
        "type": "number",
        "nullable": true
      },
      { "name": "is_active", "type": "boolean", "nullable": false },
      { "name": "type", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "avoid_points", "type": "string", "nullable": true },
      { "name": "created_by", "type": "number", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": true }
    ]
  },
  {
    "table_name": "on_site_locations",
    "columns": [
      { "name": "location", "type": "string", "nullable": false },
      { "name": "active", "type": "boolean", "nullable": true },
      { "name": "address", "type": "string", "nullable": false },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "passenger_addresses",
    "columns": [
      { "name": "created_at", "type": "Date", "nullable": true },
      { "name": "place_id", "type": "string", "nullable": true },
      { "name": "title", "type": "string", "nullable": true },
      { "name": "location", "type": "string", "nullable": true },
      { "name": "address_type", "type": "number", "nullable": false },
      { "name": "passenger_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "updated_at", "type": "Date", "nullable": true },
      { "name": "is_active", "type": "boolean", "nullable": false }
    ]
  },
  {
    "table_name": "passenger_campaigns",
    "columns": [
      { "name": "passenger_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "reward_id", "type": "number", "nullable": false },
      { "name": "created_at", "type": "Date", "nullable": true }
    ]
  },
  {
    "table_name": "passenger_default_payment_method",
    "columns": [
      { "name": "last_update_date", "type": "Date", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "payment_method_id", "type": "number", "nullable": true },
      { "name": "passenger_id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": true }
    ]
  },
  {
    "table_name": "passenger_delivery_demands",
    "columns": [
      { "name": "latitude", "type": "string", "nullable": false },
      { "name": "passenger_id", "type": "number", "nullable": false },
      { "name": "longitude", "type": "string", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": true }
    ]
  },
  {
    "table_name": "passenger_demands",
    "columns": [
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "longitude", "type": "string", "nullable": false },
      { "name": "latitude", "type": "string", "nullable": false },
      { "name": "passenger_id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "passenger_error_response_logs",
    "columns": [
      { "name": "endpoint", "type": "string", "nullable": true },
      { "name": "access_token", "type": "string", "nullable": true },
      { "name": "response_message", "type": "string", "nullable": true },
      { "name": "request_body", "type": "string", "nullable": true },
      { "name": "request_id", "type": "string", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "passenger_id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "passenger_fine_debts",
    "columns": [
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "payment_transaction_id", "type": "string", "nullable": true },
      { "name": "conversation_id", "type": "string", "nullable": true },
      { "name": "batch_id", "type": "number", "nullable": true },
      { "name": "status", "type": "number", "nullable": true },
      { "name": "is_cancelled", "type": "boolean", "nullable": true },
      { "name": "passenger_id", "type": "number", "nullable": true },
      { "name": "update_date", "type": "Date", "nullable": true },
      { "name": "amount", "type": "number", "nullable": true },
      { "name": "fine_id", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "payment_id", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "passenger_fines",
    "columns": [
      { "name": "payment_id", "type": "string", "nullable": true },
      { "name": "transaction_id", "type": "string", "nullable": true },
      { "name": "status", "type": "number", "nullable": true },
      { "name": "is_cancelled", "type": "boolean", "nullable": true },
      { "name": "processed_date", "type": "Date", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "booking_id", "type": "number", "nullable": true },
      { "name": "amount", "type": "number", "nullable": false },
      { "name": "passenger_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "passenger_home_screen_login_location",
    "columns": [
      { "name": "latitude", "type": "string", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "passenger_id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "longitude", "type": "string", "nullable": false }
    ]
  },
  {
    "table_name": "passenger_issues",
    "columns": [
      { "name": "trip_id", "type": "number", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "type", "type": "number", "nullable": true },
      { "name": "description", "type": "string", "nullable": true },
      { "name": "passenger_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "booking_id", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "passenger_promo_codes",
    "columns": [
      { "name": "updated_date", "type": "Date", "nullable": true },
      { "name": "user_reference_code_id", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "passenger_id", "type": "number", "nullable": true },
      { "name": "promo_code_id", "type": "number", "nullable": true },
      { "name": "booking_id", "type": "number", "nullable": true },
      { "name": "status", "type": "number", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": true }
    ]
  },
  {
    "table_name": "passenger_promo_codes_test",
    "columns": [
      { "name": "id", "type": "number", "nullable": true },
      { "name": "passenger_id", "type": "number", "nullable": true },
      { "name": "updated_date", "type": "Date", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "status", "type": "number", "nullable": true },
      { "name": "booking_id", "type": "number", "nullable": true },
      { "name": "promo_code_id", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "passenger_refunds",
    "columns": [
      { "name": "conversation_id", "type": "string", "nullable": false },
      { "name": "payment_transaction_id", "type": "string", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "passenger_id", "type": "number", "nullable": false },
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "booking_payment_id", "type": "number", "nullable": false },
      { "name": "status", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "updated_date", "type": "Date", "nullable": true }
    ]
  },
  {
    "table_name": "passenger_rewards",
    "columns": [
      { "name": "created_at", "type": "Date", "nullable": false },
      { "name": "is_send", "type": "boolean", "nullable": true },
      { "name": "reward_id", "type": "number", "nullable": false },
      { "name": "passenger_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "trip_id", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "passengers",
    "columns": [
      { "name": "uuid", "type": "any", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "last_login_time", "type": "Date", "nullable": true },
      { "name": "last_known_point", "type": "string", "nullable": true },
      {
        "name": "mobile_phone_country_code",
        "type": "string",
        "nullable": true
      },
      { "name": "surname", "type": "string", "nullable": true },
      { "name": "name", "type": "string", "nullable": true },
      { "name": "one_signal_id", "type": "string", "nullable": true },
      { "name": "language", "type": "string", "nullable": true },
      { "name": "access_token", "type": "string", "nullable": true },
      { "name": "last_update_time", "type": "Date", "nullable": true },
      { "name": "score", "type": "number", "nullable": true },
      { "name": "is_blocked", "type": "boolean", "nullable": true },
      { "name": "mobile_phone", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "pg_stat_statements",
    "columns": [
      { "name": "local_blks_dirtied", "type": "number", "nullable": true },
      { "name": "local_blks_read", "type": "number", "nullable": true },
      { "name": "local_blks_hit", "type": "number", "nullable": true },
      { "name": "shared_blks_written", "type": "number", "nullable": true },
      { "name": "shared_blks_dirtied", "type": "number", "nullable": true },
      { "name": "shared_blks_read", "type": "number", "nullable": true },
      { "name": "shared_blks_hit", "type": "number", "nullable": true },
      { "name": "rows", "type": "number", "nullable": true },
      { "name": "stddev_exec_time", "type": "number", "nullable": true },
      { "name": "mean_exec_time", "type": "number", "nullable": true },
      { "name": "max_exec_time", "type": "number", "nullable": true },
      { "name": "min_exec_time", "type": "number", "nullable": true },
      { "name": "calls", "type": "number", "nullable": true },
      { "name": "total_exec_time", "type": "number", "nullable": true },
      { "name": "stddev_plan_time", "type": "number", "nullable": true },
      { "name": "dbid", "type": "any", "nullable": true },
      { "name": "userid", "type": "any", "nullable": true },
      { "name": "queryid", "type": "number", "nullable": true },
      { "name": "plans", "type": "number", "nullable": true },
      { "name": "total_plan_time", "type": "number", "nullable": true },
      { "name": "query", "type": "string", "nullable": true },
      { "name": "min_plan_time", "type": "number", "nullable": true },
      { "name": "max_plan_time", "type": "number", "nullable": true },
      { "name": "wal_bytes", "type": "number", "nullable": true },
      { "name": "mean_plan_time", "type": "number", "nullable": true },
      { "name": "toplevel", "type": "boolean", "nullable": true },
      { "name": "wal_fpi", "type": "number", "nullable": true },
      { "name": "wal_records", "type": "number", "nullable": true },
      { "name": "blk_write_time", "type": "number", "nullable": true },
      { "name": "blk_read_time", "type": "number", "nullable": true },
      { "name": "temp_blks_written", "type": "number", "nullable": true },
      { "name": "temp_blks_read", "type": "number", "nullable": true },
      { "name": "local_blks_written", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "pg_stat_statements_info",
    "columns": [
      { "name": "dealloc", "type": "number", "nullable": true },
      { "name": "stats_reset", "type": "Date", "nullable": true }
    ]
  },
  {
    "table_name": "places",
    "columns": [
      { "name": "country", "type": "string", "nullable": true },
      { "name": "main_text", "type": "string", "nullable": true },
      { "name": "created_at", "type": "Date", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "place_id", "type": "string", "nullable": true },
      { "name": "location", "type": "string", "nullable": true },
      { "name": "city", "type": "string", "nullable": true },
      { "name": "street", "type": "string", "nullable": true },
      { "name": "district", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "promo_code_properties",
    "columns": [
      { "name": "discount_amount", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "promo_code_id", "type": "number", "nullable": false },
      { "name": "bonus_oil_prize", "type": "number", "nullable": true },
      { "name": "created_at", "type": "Date", "nullable": false }
    ]
  },
  {
    "table_name": "promo_codes",
    "columns": [
      { "name": "updated_date", "type": "Date", "nullable": true },
      { "name": "code", "type": "string", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "reward_id", "type": "number", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "expire_date", "type": "Date", "nullable": true },
      { "name": "active", "type": "boolean", "nullable": true },
      { "name": "total_use_count", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "quicksight_dashboards",
    "columns": [
      { "name": "source_id", "type": "string", "nullable": false },
      { "name": "name", "type": "string", "nullable": false },
      { "name": "auto_refresh", "type": "boolean", "nullable": true },
      { "name": "refresh_button", "type": "boolean", "nullable": true },
      { "name": "permission_key", "type": "string", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "category_name", "type": "string", "nullable": false }
    ]
  },
  {
    "table_name": "rate_limiter_rules",
    "columns": [
      { "name": "key", "type": "string", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "action", "type": "string", "nullable": false },
      { "name": "max_amount", "type": "number", "nullable": true },
      { "name": "max_count", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "rematch_ignored_driver_logs",
    "columns": [
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "passenger_id", "type": "number", "nullable": false },
      { "name": "booking_id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "rewards",
    "columns": [
      { "name": "start_date", "type": "Date", "nullable": false },
      { "name": "popup_button", "type": "string", "nullable": true },
      { "name": "end_date", "type": "Date", "nullable": true },
      { "name": "max_earning_per_user", "type": "number", "nullable": true },
      { "name": "bonus_prize", "type": "number", "nullable": true },
      { "name": "assigned_to_individual", "type": "boolean", "nullable": true },
      { "name": "geofences", "type": "any", "nullable": true },
      { "name": "vehicle_type", "type": "number", "nullable": true },
      { "name": "is_promo_code_active", "type": "boolean", "nullable": false },
      { "name": "instant", "type": "boolean", "nullable": true },
      { "name": "coupon_expire_day", "type": "number", "nullable": true },
      { "name": "label", "type": "string", "nullable": false },
      { "name": "name", "type": "string", "nullable": false },
      { "name": "description", "type": "string", "nullable": true },
      { "name": "image_url", "type": "string", "nullable": false },
      { "name": "notification", "type": "string", "nullable": true },
      { "name": "coupon_type", "type": "number", "nullable": true },
      { "name": "amount", "type": "number", "nullable": true },
      { "name": "period_end", "type": "any", "nullable": true },
      { "name": "period_start", "type": "any", "nullable": true },
      { "name": "popup_title", "type": "string", "nullable": true },
      { "name": "popup_description", "type": "string", "nullable": true },
      { "name": "is_enabled", "type": "boolean", "nullable": true },
      { "name": "ride_count", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "type", "type": "number", "nullable": false },
      { "name": "target_group", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "scanned_qrs",
    "columns": [
      { "name": "created_date", "type": "Date", "nullable": false },
      {
        "name": "mobile_phone_country_code",
        "type": "string",
        "nullable": true
      },
      { "name": "created_app_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "mobile_phone", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "spatial_ref_sys",
    "columns": [
      { "name": "srtext", "type": "string", "nullable": true },
      { "name": "srid", "type": "number", "nullable": false },
      { "name": "auth_srid", "type": "number", "nullable": true },
      { "name": "proj4text", "type": "string", "nullable": true },
      { "name": "auth_name", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "support_center_event_types",
    "columns": [
      { "name": "id", "type": "number", "nullable": false },
      { "name": "event_name", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "support_center_items",
    "columns": [
      { "name": "created_at", "type": "Date", "nullable": false },
      { "name": "call_center_number", "type": "string", "nullable": true },
      { "name": "created_by", "type": "number", "nullable": false },
      { "name": "updated_at", "type": "Date", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      {
        "name": "is_redirect_to_call_center",
        "type": "boolean",
        "nullable": false
      },
      { "name": "detail_en", "type": "string", "nullable": true },
      { "name": "detail_tr", "type": "string", "nullable": true },
      { "name": "name_tr", "type": "string", "nullable": false },
      { "name": "name_en", "type": "string", "nullable": false },
      { "name": "sort", "type": "number", "nullable": true },
      { "name": "parent_id", "type": "number", "nullable": true },
      { "name": "tags", "type": "any", "nullable": true },
      { "name": "is_archived", "type": "boolean", "nullable": false },
      { "name": "app", "type": "number", "nullable": false },
      { "name": "updated_by", "type": "number", "nullable": true },
      { "name": "type", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "support_center_logs",
    "columns": [
      { "name": "main_category_id", "type": "number", "nullable": true },
      {
        "name": "is_redirect_call_center",
        "type": "boolean",
        "nullable": true
      },
      { "name": "event_id", "type": "number", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "topic_id", "type": "number", "nullable": false },
      { "name": "sub_category_id", "type": "number", "nullable": true },
      { "name": "user_id", "type": "number", "nullable": false },
      { "name": "user_type", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "surge_config_logs",
    "columns": [
      { "name": "updated_at", "type": "Date", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "new_value", "type": "string", "nullable": false },
      { "name": "current_value", "type": "string", "nullable": false },
      { "name": "updated_by", "type": "number", "nullable": false },
      { "name": "vehicle_type", "type": "number", "nullable": false },
      { "name": "fence", "type": "number", "nullable": false },
      { "name": "key", "type": "string", "nullable": false },
      { "name": "configuration_id", "type": "string", "nullable": false }
    ]
  },
  {
    "table_name": "suspend_rules",
    "columns": [
      { "name": "create_date", "type": "Date", "nullable": true },
      { "name": "driver_ban_reason_id", "type": "number", "nullable": false },
      { "name": "is_indefinite", "type": "boolean", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "suspend_day", "type": "number", "nullable": true },
      { "name": "repeat_in_days", "type": "number", "nullable": true },
      { "name": "message", "type": "string", "nullable": true },
      { "name": "repeat_count", "type": "number", "nullable": true },
      { "name": "tag", "type": "any", "nullable": true }
    ]
  },
  {
    "table_name": "taxi_demands",
    "columns": [
      { "name": "id", "type": "number", "nullable": false },
      { "name": "passenger_id", "type": "number", "nullable": false },
      { "name": "latitude", "type": "string", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "longitude", "type": "string", "nullable": false }
    ]
  },
  {
    "table_name": "taxi_driver_validation_error_logs",
    "columns": [
      { "name": "plate", "type": "string", "nullable": true },
      { "name": "vehicle_id", "type": "number", "nullable": true },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "error_message", "type": "string", "nullable": true },
      { "name": "created_at", "type": "Date", "nullable": true },
      { "name": "tckn", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "trip_charges",
    "columns": [
      { "name": "type", "type": "number", "nullable": false },
      { "name": "trip_id", "type": "number", "nullable": false },
      { "name": "fee", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "trip_completion_logs",
    "columns": [
      { "name": "id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "trip_id", "type": "number", "nullable": false },
      { "name": "user_id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "trip_details",
    "columns": [
      { "name": "trip_id", "type": "number", "nullable": true },
      { "name": "subscription_id", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "trip_motionless_log",
    "columns": [
      { "name": "lat", "type": "number", "nullable": true },
      { "name": "is_motionless", "type": "boolean", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "trip_id", "type": "number", "nullable": false },
      { "name": "lon", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "trip_obstruction_reports",
    "columns": [
      { "name": "created_date", "type": "Date", "nullable": false },
      { "name": "latitude", "type": "number", "nullable": false },
      { "name": "passenger_id", "type": "number", "nullable": false },
      { "name": "trip_id", "type": "number", "nullable": false },
      { "name": "type", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "longitude", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "trip_review_feedbacks",
    "columns": [
      { "name": "id", "type": "number", "nullable": false },
      { "name": "title", "type": "string", "nullable": false },
      { "name": "po_key", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "trip_reviews",
    "columns": [
      { "name": "id", "type": "number", "nullable": false },
      { "name": "description", "type": "string", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "feedbacks", "type": "any", "nullable": true },
      { "name": "stars", "type": "number", "nullable": true },
      { "name": "review_for", "type": "number", "nullable": false },
      { "name": "reviewer", "type": "number", "nullable": false },
      { "name": "trip_id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "trip_route_error_reports",
    "columns": [
      { "name": "id", "type": "number", "nullable": false },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "trip_id", "type": "number", "nullable": false },
      { "name": "created_at", "type": "Date", "nullable": false }
    ]
  },
  {
    "table_name": "trip_share_location_logs",
    "columns": [
      { "name": "trip_id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "url", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "trips",
    "columns": [
      { "name": "end_date", "type": "Date", "nullable": true },
      { "name": "start_date", "type": "Date", "nullable": true },
      { "name": "status", "type": "number", "nullable": false },
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "passenger_id", "type": "number", "nullable": false },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "update_date", "type": "Date", "nullable": true },
      { "name": "polyline", "type": "string", "nullable": true },
      { "name": "vehicle_type", "type": "number", "nullable": true },
      { "name": "is_fraud", "type": "boolean", "nullable": true },
      { "name": "fraud_reason", "type": "number", "nullable": true },
      { "name": "fraud_reasons", "type": "any", "nullable": true },
      { "name": "start_geofence", "type": "number", "nullable": true },
      { "name": "is_motionless", "type": "boolean", "nullable": true },
      { "name": "destination", "type": "string", "nullable": true },
      { "name": "passenger_route", "type": "string", "nullable": true },
      { "name": "origin", "type": "string", "nullable": true },
      { "name": "route", "type": "string", "nullable": true },
      { "name": "end_point", "type": "string", "nullable": true },
      { "name": "start_point", "type": "string", "nullable": true },
      { "name": "everest_price", "type": "number", "nullable": true },
      { "name": "depreciation_price", "type": "number", "nullable": true },
      { "name": "oil_price", "type": "number", "nullable": true },
      { "name": "price_total", "type": "number", "nullable": true },
      { "name": "estimated_route", "type": "string", "nullable": true },
      { "name": "distance", "type": "number", "nullable": true },
      { "name": "duration", "type": "number", "nullable": true },
      { "name": "payment_type", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "turkey_tax_offices",
    "columns": [
      { "name": "city", "type": "string", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "office", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "user_coupons",
    "columns": [
      { "name": "amount", "type": "number", "nullable": true },
      { "name": "is_selected", "type": "boolean", "nullable": false },
      { "name": "is_used", "type": "boolean", "nullable": false },
      { "name": "reward_id", "type": "number", "nullable": false },
      { "name": "user_type", "type": "number", "nullable": true },
      { "name": "user_id", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "expired_at", "type": "Date", "nullable": true },
      { "name": "created_at", "type": "Date", "nullable": false },
      { "name": "created_by", "type": "number", "nullable": false },
      { "name": "is_canceled", "type": "boolean", "nullable": false },
      { "name": "used_at", "type": "Date", "nullable": true },
      { "name": "code", "type": "string", "nullable": false },
      { "name": "bonus_prize", "type": "number", "nullable": true },
      { "name": "total_amount", "type": "number", "nullable": true },
      { "name": "booking_id", "type": "number", "nullable": true }
    ]
  },
  {
    "table_name": "user_reference_codes",
    "columns": [
      { "name": "created_at", "type": "Date", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "user_type", "type": "number", "nullable": false },
      { "name": "user_id", "type": "number", "nullable": false },
      { "name": "usage_reward_id", "type": "number", "nullable": true },
      { "name": "share_reward_id", "type": "number", "nullable": true },
      { "name": "code", "type": "string", "nullable": false }
    ]
  },
  {
    "table_name": "user_trip_info",
    "columns": [
      { "name": "id", "type": "number", "nullable": false },
      { "name": "first_nonfraud_trip_date", "type": "Date", "nullable": true },
      { "name": "first_trip_date", "type": "Date", "nullable": true },
      { "name": "user_id", "type": "number", "nullable": false },
      {
        "name": "is_user_have_first_trip",
        "type": "boolean",
        "nullable": false
      },
      {
        "name": "is_user_have_first_nonfraud_trip",
        "type": "boolean",
        "nullable": false
      },
      { "name": "user_type", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "vehicle_approve_logs",
    "columns": [
      { "name": "vehicle_id", "type": "number", "nullable": true },
      { "name": "to_state", "type": "number", "nullable": true },
      { "name": "from_state", "type": "number", "nullable": true },
      { "name": "admin_id", "type": "number", "nullable": true },
      { "name": "update_date", "type": "Date", "nullable": true },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "vehicle_configs",
    "columns": [
      { "name": "oil_price_per_km", "type": "number", "nullable": false },
      { "name": "start_price", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      {
        "name": "secondary_vehicle_option",
        "type": "number",
        "nullable": true
      },
      { "name": "bridge_toll", "type": "number", "nullable": true },
      { "name": "price_per_duration", "type": "number", "nullable": true },
      { "name": "price_per_km", "type": "number", "nullable": false },
      { "name": "duration_per_km", "type": "number", "nullable": false },
      { "name": "vehicle_type", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "vehicle_control_photos",
    "columns": [
      { "name": "approver", "type": "number", "nullable": true },
      { "name": "uploaded_date", "type": "Date", "nullable": true },
      { "name": "approved_date", "type": "Date", "nullable": true },
      { "name": "vehicle_id", "type": "number", "nullable": false },
      { "name": "is_approved", "type": "boolean", "nullable": true },
      { "name": "confidence", "type": "number", "nullable": true },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "photo", "type": "string", "nullable": false }
    ]
  },
  {
    "table_name": "vehicle_delivery_configs",
    "columns": [
      { "name": "duration_per_km", "type": "number", "nullable": false },
      { "name": "vehicle_type", "type": "number", "nullable": false },
      { "name": "oil_price_per_km", "type": "number", "nullable": false },
      { "name": "start_price", "type": "number", "nullable": false },
      { "name": "price_per_km", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "vehicle_photos",
    "columns": [
      { "name": "photo", "type": "string", "nullable": false },
      { "name": "vehicle_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": false }
    ]
  },
  {
    "table_name": "vehicle_reject_reasons",
    "columns": [
      { "name": "sort", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "is_push_enabled", "type": "boolean", "nullable": true },
      { "name": "parent_id", "type": "number", "nullable": true },
      { "name": "is_active", "type": "boolean", "nullable": true },
      { "name": "push_text_en", "type": "string", "nullable": true },
      { "name": "push_title_en", "type": "string", "nullable": true },
      { "name": "push_text_tr", "type": "string", "nullable": true },
      { "name": "push_title_tr", "type": "string", "nullable": true },
      { "name": "reason", "type": "string", "nullable": true }
    ]
  },
  {
    "table_name": "vehicles",
    "columns": [
      { "name": "model", "type": "string", "nullable": false },
      { "name": "brand", "type": "string", "nullable": false },
      { "name": "is_in_use", "type": "boolean", "nullable": true },
      { "name": "license_photo", "type": "string", "nullable": true },
      { "name": "reject_reasons", "type": "any", "nullable": true },
      {
        "name": "vehicle_registration_state",
        "type": "number",
        "nullable": true
      },
      { "name": "type", "type": "number", "nullable": false },
      { "name": "year", "type": "number", "nullable": false },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "updated_date", "type": "Date", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "admin_last_update_date", "type": "Date", "nullable": true },
      { "name": "plate", "type": "string", "nullable": true },
      { "name": "color", "type": "string", "nullable": false },
      { "name": "is_deleted", "type": "boolean", "nullable": true }
    ]
  },
  {
    "table_name": "waypoints",
    "columns": [
      { "name": "created_by", "type": "number", "nullable": true },
      { "name": "location", "type": "string", "nullable": false },
      { "name": "obstruction_point", "type": "string", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "order", "type": "number", "nullable": true },
      { "name": "created_date", "type": "Date", "nullable": true }
    ]
  },
  {
    "table_name": "waypoints_log",
    "columns": [
      { "name": "created_by", "type": "number", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "waypoint_id", "type": "number", "nullable": false },
      { "name": "order", "type": "number", "nullable": true },
      { "name": "is_deleted", "type": "boolean", "nullable": false },
      { "name": "created_date", "type": "Date", "nullable": true },
      { "name": "obstruction_point", "type": "string", "nullable": false },
      { "name": "location", "type": "string", "nullable": false }
    ]
  },
  {
    "table_name": "years",
    "columns": [
      { "name": "year", "type": "string", "nullable": false },
      { "name": "id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "zeus_call_logs",
    "columns": [
      { "name": "admin_id", "type": "number", "nullable": false },
      { "name": "booking_id", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "driver_id", "type": "number", "nullable": false },
      { "name": "called_check_date", "type": "Date", "nullable": true }
    ]
  },
  {
    "table_name": "zone_logs",
    "columns": [
      { "name": "name", "type": "string", "nullable": false },
      { "name": "is_active", "type": "boolean", "nullable": false },
      { "name": "zone_id", "type": "number", "nullable": false },
      { "name": "change_type", "type": "number", "nullable": false },
      { "name": "updated_date", "type": "Date", "nullable": true },
      { "name": "fence_id", "type": "number", "nullable": false },
      { "name": "polygon", "type": "string", "nullable": false },
      { "name": "point_index", "type": "number", "nullable": true },
      { "name": "type", "type": "number", "nullable": false },
      { "name": "matching_distance", "type": "number", "nullable": true },
      { "name": "is_archived", "type": "boolean", "nullable": true },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "admin_id", "type": "number", "nullable": false }
    ]
  },
  {
    "table_name": "zones",
    "columns": [
      { "name": "matching_distance", "type": "number", "nullable": true },
      { "name": "is_archived", "type": "boolean", "nullable": true },
      { "name": "type", "type": "number", "nullable": false },
      { "name": "id", "type": "number", "nullable": false },
      { "name": "is_active", "type": "boolean", "nullable": false },
      { "name": "fence_id", "type": "number", "nullable": false },
      { "name": "point_index", "type": "number", "nullable": true },
      { "name": "polygon", "type": "string", "nullable": false },
      { "name": "name", "type": "string", "nullable": false }
    ]
  }
];
const generateTypes = (data: any) => {
  const tableDefinitions = data.map((table: any) => {
    const columns = table.columns.map((col: any) => {
      let tsType = col.type.toLowerCase();
      switch (tsType) {
        case 'number':
          tsType = 'number';
          break;
        case 'string':
          tsType = 'string';
          break;
        case 'boolean':
          tsType = 'boolean';
          break;
        case 'date':
          tsType = 'Date';
          break;
        case 'any':
          tsType = 'any';
          break;
        default:
          tsType = 'any';
      }
      const nullable = col.nullable ? '?' : '';
      return `    ${col.name}${nullable}: ${tsType};`;
    }).join('\n');

    return `  ${table.table_name}: {\n${columns}\n  }`;
  }).join(';\n');

  return `export interface DB {\n${tableDefinitions}\n}

export type Tables = keyof DB;
export type Columns<T extends Tables> = keyof DB[T];
`;
};

const types = generateTypes(schemaJson);

const outputPath = path.resolve(__dirname, 'generated-types.ts');
fs.writeFileSync(outputPath, types, 'utf8');

console.log(`Types generated, path: ${outputPath}`);
