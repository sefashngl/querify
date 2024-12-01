export interface DB {
  actions: {
    description?: string;
    is_enabled?: boolean;
    name: string;
    id: number;
  };
  admin_roles: {
    name: string;
    id: number;
    actions?: any;
    azure_ad_id?: any;
    is_enabled?: boolean;
  };
  admins: {
    name: string;
    otp_requested_at?: Date;
    access_token?: string;
    password?: string;
    email: string;
    last_login_date?: Date;
    roles?: any;
    sms_code?: string;
    surname?: string;
    is_enabled?: boolean;
    mobile_phone?: string;
    id: number;
  };
  app_config_logs: {
    json_key?: string;
    apps?: number;
    is_editable?: boolean;
    updated_at: Date;
    updated_by: number;
    id: number;
    key: string;
    value: string;
    value_type?: string;
  };
  app_configs: {
    description?: string;
    value_type?: string;
    display_name?: string;
    name: string;
    json_key?: string;
    apps?: number;
    is_editable: boolean;
    id: number;
    value?: string;
  };
  app_delivery_config_logs: {
    key: string;
    value: string;
    id: number;
    updated_by: number;
    updated_at: Date;
  };
  app_delivery_configs: {
    value?: string;
    name: string;
    id: number;
    display_name?: string;
    value_type?: string;
    description?: string;
  };
  banned_drivers: {
    ban_type?: number;
    updated_date?: Date;
    bulk_action_id?: number;
    ban_note?: string;
    driver_id: number;
    end_date?: Date;
    created_date: Date;
    ban_by: number;
    is_active: boolean;
    tckn?: string;
    mobile_phone?: string;
    id: number;
    tckn_md5?: string;
  };
  banned_drivers_log: {
    id: number;
    is_active?: boolean;
    ban_id: number;
    end_date?: Date;
    ban_by: number;
    tckn?: string;
    ban_type?: number;
    ban_note?: string;
    ban_reason?: string;
    mobile_phone?: string;
    created_date: Date;
  };
  banned_passengers: {
    is_banned: boolean;
    tckn?: string;
    ban_reason?: string;
    mobile_phone?: string;
    banned_by: number;
    created_date: Date;
    id: number;
  };
  booking_cancel_reasons: {
    id: number;
    tr_content?: string;
    type: number;
    en_content?: string;
  };
  booking_delivery_details: {
    sender_mobile_phone?: string;
    sender_mobile_phone_country_code?: string;
    sender_surname?: string;
    update_date?: Date;
    ask_pin?: boolean;
    sender_name?: string;
    is_sender?: boolean;
    created_at?: Date;
    id: number;
    receiver_mobile_phone?: string;
    receiver_mobile_phone_country_code?: string;
    receiver_surname?: string;
    receiver_name?: string;
    pin_code?: string;
    booking_id: number;
    passenger_id: number;
    receiver_courier_note?: string;
    sender_courier_note?: string;
  };
  booking_discount_details: {
    discount_type?: number;
    total_amount?: number;
    reward_type?: number;
    passenger_id?: number;
    expire_date?: Date;
    promo_code?: string;
    description?: string;
    title?: string;
    id: number;
    discount_id?: number;
    discount_price?: number;
    discounted_amount?: number;
    booking_id?: number;
  };
  booking_log_status: {
    name?: string;
    id: number;
  };
  booking_logs: {
    created_date: Date;
    status: number;
    driver_id: number;
    booking_id: number;
    match_distance?: number;
    id: number;
    driver_location?: string;
  };
  booking_matching_batch_logs: {
    response_date: Date;
    id: number;
    matched_driver_id: number;
    option_num_drivers_per_booking: number;
    option_max_matching_radius: number;
    response_driver_list?: string;
    group_id: any;
    booking_id: number;
    created_date: Date;
  };
  booking_matching_log_v2: {
    matched_drivers?: string;
    forbidden_drivers?: string;
    message?: string;
    id: number;
    booking_id: number;
    driver_count?: number;
    is_success: boolean;
    error_code?: number;
    created_date?: Date;
    request_id: string;
  };
  booking_obstruction_points: {
    to_stop?: number;
    point_id: number;
    created_date: Date;
    type: number;
    booking_id: number;
    id: number;
    point: string;
    area_point: string;
    avoid_points?: string;
  };
  booking_passenger_location_logs: {
    latitude: number;
    booking_id: number;
    id: number;
    created_date: Date;
    booking_status: number;
    longitude: number;
  };
  booking_payment_details: {
    passenger_ip_address?: string;
    last_four_digits?: string;
    card_provider?: number;
    commision_rate?: number;
    is_active: boolean;
    created_date?: Date;
    card_id?: number;
    payment_type?: number;
    booking_id: number;
    card_label?: string;
    id: number;
  };
  booking_payment_request: {
    id: number;
    updated_date?: Date;
    created_date?: Date;
    status?: number;
    card_id?: number;
    booking_id: number;
    conversation_id?: string;
  };
  booking_payments: {
    payment_id?: string;
    id: number;
    passenger_id: number;
    card_id: number;
    booking_id: number;
    created_date: Date;
    conversation_id: string;
    payment_transaction_id: string;
  };
  booking_route_history: {
    updated_date?: Date;
    depreciation_price?: number;
    estimated_price?: number;
    booking_id: number;
    duration?: number;
    distance?: number;
    created_date: Date;
    polyline_points?: string;
    state: number;
    oil_price?: number;
    id: number;
  };
  booking_state_logs: {
    to_status: number;
    booking_id: number;
    id: number;
    created_date: Date;
    from_status: number;
  };
  booking_status: {
    name?: string;
    id: number;
  };
  booking_stop_points: {
    booking_id: number;
    stop_type?: number;
    state?: number;
    estimated_time?: number;
    estimated_distance?: number;
    updated_date?: Date;
    created_date: Date;
    is_arrived?: boolean;
    list_order: number;
    booking_route_history_id?: number;
    id: number;
    place_id?: string;
    polyline_points?: string;
    point: string;
    arrived_at?: Date;
    estimated_price?: number;
  };
  booking_surge_details: {
    marker_color?: string;
    vehicle_type: number;
    booking_id: number;
    id: number;
    is_used: boolean;
    surge_rate?: number;
    created_date: Date;
    surge_multiplier?: number;
  };
  booking_vehicle_option_logs: {
    vehicle_type?: number;
    driver_id?: number;
    booking_id: number;
    id: number;
    price?: number;
    created_date?: Date;
    estimated_distance?: number;
    duration?: number;
    depreciation_price?: number;
    oil_price?: number;
  };
  booking_waypoints: {
    booking_id: number;
    created_date?: Date;
    to_stop?: number;
    id: number;
    waypoint_id?: number;
  };
  bookings: {
    subfence_id?: number;
    vehicle_id?: number;
    pickup_route?: string;
    driver_end_place_id?: string;
    driver_start_place_id?: string;
    polyline_points?: string;
    code?: string;
    destination?: string;
    origin?: string;
    end_location: string;
    start_location: string;
    id: number;
    passenger_id: number;
    driver_id?: number;
    created_date: Date;
    update_date?: Date;
    status?: number;
    estimated_distance?: number;
    estimated_price?: number;
    duration?: number;
    payment_type?: number;
    oil_price?: number;
    depreciation_price?: number;
    vehicle_type?: number;
    passenger_offer_price?: number;
    estimated_match_time?: number;
    estimated_match_distance?: number;
    estimated_direct_match_distance?: number;
    cancel_reason?: number;
    matching_distance?: number;
    type?: number;
  };
  brands: {
    name: string;
    id: number;
    type: number;
  };
  call_center_options: {
    opt_value?: string;
    created_at: Date;
    opt_key: string;
    is_deleted: boolean;
    id: number;
    is_active: boolean;
    opt_text_tr?: string;
    opt_group: string;
  };
  call_center_records: {
    solution_categories?: any;
    updated_by?: number;
    updated_at?: Date;
    created_by?: number;
    created_at: Date;
    tag?: number;
    status: number;
    solution_category?: number;
    solution_id?: number;
    user_id: number;
    user_type: number;
    record_finished_at?: Date;
    record_started_at?: Date;
    record_duration?: number;
    record_owner_id?: number;
    record_type?: number;
    role_id?: number;
    id: number;
    queue_name?: string;
    note?: string;
    record_owner?: string;
    sub_status?: number;
  };
  call_center_records_logs: {
    log_by?: number;
    note?: string;
    status?: number;
    log_at?: Date;
    tag?: number;
    sub_status?: number;
    id: number;
    record_id?: number;
    solution_categories?: any;
    record_started_at?: Date;
    record_finished_at?: Date;
    role_id?: number;
    solution_category?: number;
    record_duration?: number;
  };
  calls: {
    caller?: string;
    id: number;
    type?: number;
    created_date?: Date;
    callee_id?: number;
    caller_id?: number;
    caller_type?: number;
    processed?: boolean;
    callee?: string;
  };
  chat_messages: {
    is_reported?: boolean;
    created_date: Date;
    message: string;
    id: number;
    chat_id: number;
    sender: number;
    is_send?: boolean;
    is_read?: boolean;
  };
  chats: {
    is_active: boolean;
    passenger_id: number;
    driver_id: number;
    updated_date?: Date;
    booking_id: number;
    created_date: Date;
    id: number;
  };
  colors: {
    created_at?: Date;
    created_at_tzone?: Date;
    name: string;
    id: number;
  };
  coupons: {
    code: string;
    is_enabled?: boolean;
    id: number;
    assign_date?: Date;
    driver_id?: number;
    reward_id: number;
  };
  courier_statistic_definitions: {
    max_val: number;
    description: string;
    type: number;
    min_val: number;
    id: number;
  };
  couriers: {
    vkn?: string;
    driver_id: number;
    update_date?: Date;
    created_at?: Date;
    id: number;
    score?: number;
  };
  delivery_geofences: {
    is_active?: boolean;
    name?: string;
    polygon?: string;
    id: number;
  };
  driver_address: {
    address?: string;
    is_active?: boolean;
    district?: string;
    city?: string;
    neighborhood?: string;
    id: number;
    driver_id: number;
    created_at?: Date;
  };
  driver_anonymize_log: {
    driver_id: number;
    admin_id: number;
    created_date: Date;
    id: number;
  };
  driver_ban_reasons: {
    push_title_tr?: string;
    is_active?: boolean;
    parent_id?: number;
    is_push_enabled?: boolean;
    id: number;
    reason?: string;
    push_text_tr?: string;
    push_title_en?: string;
    push_text_en?: string;
    tag?: any;
    po_key_limited?: string;
    po_key_limitless?: string;
  };
  driver_bulk_actions: {
    admin_id: number;
    id: number;
    created_at?: Date;
    action_type: string;
  };
  driver_campaigns: {
    driver_id: number;
    created_at?: Date;
    id: number;
    reward_id: number;
  };
  driver_company_details: {
    approved_date?: Date;
    tax_office?: number;
    vkn: string;
    admin_id?: number;
    status: number;
    id: number;
    driver_id: number;
    driver_start_date?: Date;
    updated_date?: Date;
    tax_certificate: string;
    created_date?: Date;
    tax_type?: number;
    reject_reason?: number;
    company_name: string;
  };
  driver_company_reject_reasons: {
    push_text_en?: string;
    push_title_en?: string;
    push_text_tr?: string;
    push_title_tr?: string;
    id: number;
    is_push_enabled: boolean;
    reason: string;
    is_active?: boolean;
  };
  driver_conversation_notes: {
    note: string;
    id: number;
    driver_id: number;
    admin_id?: number;
    created_date?: Date;
    type?: number;
    is_enable: boolean;
    bulk_action_id?: number;
  };
  driver_credit_cards: {
    card_token: any;
    driver_id: number;
    id: number;
    created_at: Date;
    is_default: boolean;
    is_active: boolean;
    card_name: string;
    last_digits: string;
  };
  driver_delete_requests: {
    driver_id: number;
    id: number;
    created_at: Date;
    updated_at?: Date;
    updated_by?: number;
    is_processed: boolean;
  };
  driver_destination_history: {
    driver_id: number;
    destination: string;
    created_at?: Date;
    id: number;
  };
  driver_earnings: {
    amount: number;
    driver_id: number;
    created_date: Date;
    type: number;
    earning_status: number;
    batch_id?: string;
    booking_id: number;
    id: number;
  };
  driver_earnings_status: {
    id: number;
    name: string;
  };
  driver_earnings_transfers: {
    amount: number;
    created_date: Date;
    transfer_status: number;
    confirmation_id?: number;
    cash_amount?: number;
    credit_card_amount?: number;
    fine_amount?: number;
    commission_amount?: number;
    updated_date?: Date;
    cash_count?: number;
    credit_card_count?: number;
    is_blocked?: boolean;
    retry_count?: number;
    driver_id: number;
    id: number;
    promotion_amount?: number;
    sap_error_desc?: string;
    batch_id?: string;
    retry_batch_id?: string;
    conversation_id?: string;
    iban?: string;
    sap_id?: string;
  };
  driver_earnings_transfers_confirmations: {
    approved_by?: number;
    created_date?: Date;
    approved_at?: Date;
    is_approved: boolean;
    total_transfer_amount: number;
    total_transfer_count: number;
    id: number;
    commission_amount?: number;
    blocked_amount?: number;
    cash_count?: number;
    credit_card_count?: number;
    promotion_amount?: number;
    fine_amount?: number;
    credit_card_amount?: number;
    cash_amount?: number;
    status?: number;
    approve_version?: number;
  };
  driver_earnings_transfers_error_logs: {
    driver_earnings_transfer_id: number;
    created_date: Date;
    transfer_status: number;
    id: number;
    retry_batch_id?: string;
    bulut_status_desc?: string;
    sap_transfer_status?: string;
    bulut_status_code?: string;
    sap_id?: string;
  };
  driver_earnings_transfers_status: {
    id: number;
    name: string;
  };
  driver_ibans: {
    updated_date: Date;
    iban: string;
    id: number;
    driver_id: number;
    created_date: Date;
    is_enabled: boolean;
  };
  driver_issues: {
    created_date?: Date;
    driver_id: number;
    description?: string;
    booking_id?: number;
    id: number;
    trip_id?: number;
    type?: number;
  };
  driver_iys_permissions: {
    id: number;
    driver_id?: number;
    sms_permission?: boolean;
    created_date?: Date;
    email_permission?: boolean;
    call_permission?: boolean;
  };
  driver_marker_routes: {
    id: number;
    route?: string;
    start_point: string;
    is_weekend?: boolean;
    booking_type: number;
    day_of_week?: number;
    hour_of_day?: number;
    vehicle_type: number;
  };
  driver_mobile_phone_update_logs: {
    old_phone_number?: string;
    new_phone_number?: string;
    change_date?: Date;
    driver_id: number;
    id: number;
  };
  driver_notifications: {
    title?: string;
    text: string;
    id: number;
    admin_id?: number;
    driver_id: number;
    is_read: boolean;
    read_date?: Date;
    created_date: Date;
  };
  driver_payments: {
    credit_card_id: string;
    amount: number;
    driver_id: number;
    booking_id: number;
    update_date?: Date;
    created_date: Date;
    id: number;
    status: number;
    request_id?: string;
  };
  driver_refunds: {
    booking_id: number;
    request_id?: string;
    credit_card_id: string;
    update_date?: Date;
    created_date: Date;
    status: number;
    amount: number;
    driver_id: number;
    id: number;
  };
  driver_registration_logs: {
    driver_id: number;
    id: number;
    reject_reasons?: any;
    created_date?: Date;
    to_state: number;
    from_state: number;
    admin_id?: number;
  };
  driver_reject_reasons: {
    push_text_tr?: string;
    push_title_en?: string;
    is_push_enabled: boolean;
    push_text_en?: string;
    id: number;
    parent_id?: number;
    is_active?: boolean;
    sort: number;
    reason: string;
    push_title_tr?: string;
  };
  driver_rewards: {
    driver_id: number;
    created_at?: Date;
    is_send?: boolean;
    address_id?: number;
    reward_id: number;
    id: number;
  };
  driver_selfies: {
    is_approved?: boolean;
    confidence?: number;
    id: number;
    approver?: number;
    selfie: string;
    uploaded_date?: Date;
    driver_id: number;
    approved_date?: Date;
  };
  driver_state_logs: {
    type?: number;
    id: number;
    state: number;
    driver_id: number;
    ts: Date;
    location?: string;
    active_vehicle_id?: number;
  };
  driver_statistic_definitions: {
    type: number;
    description: string;
    max_val: number;
    min_val: number;
    id: number;
  };
  drivers: {
    mobile_phone_country_code?: string;
    on_site_date?: Date;
    on_site_location?: number;
    created_at?: Date;
    registration_reject_reason?: number;
    updated_date?: Date;
    registration_state?: number;
    is_valid?: boolean;
    otp_requested_at?: Date;
    is_enabled?: boolean;
    created_date?: Date;
    last_login_date?: Date;
    birth_date?: Date;
    id: number;
    score?: number;
    reject_reasons?: any;
    enable_mode?: number;
    charge_commission?: boolean;
    super_member_popup_shown?: boolean;
    passenger_id?: number;
    is_iys_enabled?: boolean;
    uuid?: any;
    name?: string;
    trip_count?: number;
    surname?: string;
    email?: string;
    tckn?: string;
    one_signal_id?: string;
    mobile_phone?: string;
    access_token?: string;
    sms_code?: string;
    destination?: string;
    selfie?: string;
    city?: string;
    tckn_md5?: string;
    language?: string;
    pass_photo?: string;
    driver_license?: string;
    criminal?: string;
    integration_id?: string;
    location?: string;
  };
  fraud_exception_surnames: {
    surname: string;
    created_date?: Date;
    id: number;
  };
  geofence_delivery_pricing: {
    is_active?: boolean;
    min_price?: number;
    oil_price_per_km?: number;
    fence_id?: number;
    id: number;
    price_per_km?: number;
    start_price?: number;
    vehicle_type?: number;
  };
  geofence_hourly_multipliers: {
    created_at: Date;
    updated_by?: number;
    updated_at?: Date;
    day_of_week: number;
    vehicle_type: number;
    geofence_id: number;
    id: number;
    value?: number;
    hour: number;
    created_by: number;
  };
  geofence_hourly_multipliers_log: {
    id: number;
    vehicle_type: number;
    geofence_id: number;
    created_by: number;
    day_of_week: number;
    created_at: Date;
    new_value?: number;
    old_value?: number;
    hour: number;
  };
  geofence_logs: {
    is_credit_card_mandatory?: boolean;
    is_active?: boolean;
    min_tag_trip?: number;
    change_type: number;
    admin_id: number;
    geofence_id: number;
    name?: string;
    polygon?: string;
    updated_date?: Date;
    id: number;
    min_marti_ride?: number;
  };
  geofence_multipliers: {
    updated_by?: number;
    fence_id?: number;
    id: number;
    vehicle_type?: number;
    is_enabled?: boolean;
    updated_at?: Date;
  };
  geofence_pricing: {
    is_active?: boolean;
    fence_id?: number;
    id: number;
    commission_rate?: number;
    price_per_duration?: number;
    min_price?: number;
    price_per_km?: number;
    start_price?: number;
    oil_price_per_km?: number;
    vehicle_type?: number;
  };
  geofence_pricing_logs: {
    fence_id?: number;
    updated_date?: Date;
    min_price?: number;
    change_type: number;
    admin_id: number;
    geofence_pricing_id: number;
    vehicle_type?: number;
    id: number;
    oil_price_per_km?: number;
    start_price?: number;
    price_per_km?: number;
    is_active?: boolean;
  };
  geofences: {
    polygon?: string;
    name?: string;
    id: number;
    is_active?: boolean;
    is_credit_card_mandatory?: boolean;
    min_marti_ride?: number;
    min_tag_trip?: number;
    is_geofence_multiplier_active?: boolean;
  };
  geography_columns: {
    type?: string;
    srid?: number;
    coord_dimension?: number;
    f_table_name?: any;
    f_table_schema?: any;
    f_geography_column?: any;
    f_table_catalog?: any;
  };
  geometry_columns: {
    f_table_name?: any;
    coord_dimension?: number;
    srid?: number;
    type?: string;
    f_geometry_column?: any;
    f_table_catalog?: string;
    f_table_schema?: any;
  };
  invalid_login_attempts: {
    driver_id: number;
    device_id?: string;
    otp?: string;
    ts?: Date;
    ip_address?: string;
    id: number;
  };
  invites: {
    is_earned: boolean;
    invite_date: Date;
    reward_id?: number;
    mobile_phone: string;
    invitor_id: number;
    id: number;
    valid_until?: Date;
    type: number;
  };
  invoices: {
    invoice_date: Date;
    response?: string;
    is_cancelled?: boolean;
    scenario?: string;
    pdf_ready?: boolean;
    processed_date?: Date;
    customer_id?: number;
    charged_price?: number;
    ref_id?: string;
    is_processed: boolean;
    real_invoice_id?: string;
    cancelled_date?: Date;
    provider_type?: number;
    address_id?: number;
    provider_id?: number;
    id: number;
  };
  landing_banners: {
    reward_id?: number;
    sub_domain?: number;
    image?: string;
    type: number;
    is_active?: boolean;
    image_en?: string;
    domain?: number;
    id: number;
    order_no: number;
    marti_campaign_id?: number;
    expiry_date?: Date;
    geofences?: any;
    vehicle_type?: number;
  };
  landing_options: {
    button_tr: string;
    button_en: string;
    domain?: number;
    is_active?: boolean;
    order_no: number;
    content_en: string;
    content_tr: string;
    sub_domain?: number;
    id: number;
  };
  login_logs: {
    id: number;
    language?: string;
    user_type: string;
    access_token: string;
    otp_code?: string;
    vendor_id?: string;
    user_id: number;
    created_date: Date;
    user_agent?: string;
  };
  models: {
    brand_id: number;
    id: number;
    segment?: number;
    name: string;
  };
  obstruction_calls: {
    is_finished?: boolean;
    is_answerd?: boolean;
    created_date?: Date;
    created_by?: number;
    trip_id?: number;
    id: number;
    notes?: string;
    obstruction_name?: string;
  };
  obstruction_points: {
    send_zeus?: boolean;
    is_archived?: boolean;
    vehicle_types?: any;
    area_point: string;
    created_date?: Date;
    created_by?: number;
    id: number;
    point_obstacle_percentage?: number;
    type: number;
    name?: string;
    avoid_points?: string;
    is_active: boolean;
    point: string;
  };
  obstruction_points_log: {
    vehicle_types?: any;
    name?: string;
    area_points: any;
    point: string;
    is_archived?: boolean;
    send_zeus?: boolean;
    point_obstacle_percentage?: number;
    is_active: boolean;
    type: number;
    id: number;
    avoid_points?: string;
    created_by?: number;
    created_date?: Date;
  };
  on_site_locations: {
    location: string;
    active?: boolean;
    address: string;
    id: number;
  };
  passenger_addresses: {
    created_at?: Date;
    place_id?: string;
    title?: string;
    location?: string;
    address_type: number;
    passenger_id: number;
    id: number;
    updated_at?: Date;
    is_active: boolean;
  };
  passenger_campaigns: {
    passenger_id: number;
    id: number;
    reward_id: number;
    created_at?: Date;
  };
  passenger_default_payment_method: {
    last_update_date?: Date;
    id: number;
    payment_method_id?: number;
    passenger_id: number;
    created_date?: Date;
  };
  passenger_delivery_demands: {
    latitude: string;
    passenger_id: number;
    longitude: string;
    id: number;
    created_date?: Date;
  };
  passenger_demands: {
    created_date?: Date;
    id: number;
    longitude: string;
    latitude: string;
    passenger_id: number;
  };
  passenger_error_response_logs: {
    endpoint?: string;
    access_token?: string;
    response_message?: string;
    request_body?: string;
    request_id?: string;
    id: number;
    created_date?: Date;
    passenger_id: number;
  };
  passenger_fine_debts: {
    created_date?: Date;
    payment_transaction_id?: string;
    conversation_id?: string;
    batch_id?: number;
    status?: number;
    is_cancelled?: boolean;
    passenger_id?: number;
    update_date?: Date;
    amount?: number;
    fine_id?: number;
    id: number;
    payment_id?: string;
  };
  passenger_fines: {
    payment_id?: string;
    transaction_id?: string;
    status?: number;
    is_cancelled?: boolean;
    processed_date?: Date;
    created_date?: Date;
    booking_id?: number;
    amount: number;
    passenger_id: number;
    id: number;
  };
  passenger_home_screen_login_location: {
    latitude: string;
    id: number;
    passenger_id: number;
    created_date?: Date;
    longitude: string;
  };
  passenger_issues: {
    trip_id?: number;
    created_date?: Date;
    type?: number;
    description?: string;
    passenger_id: number;
    id: number;
    booking_id?: number;
  };
  passenger_promo_codes: {
    updated_date?: Date;
    user_reference_code_id?: number;
    id: number;
    passenger_id?: number;
    promo_code_id?: number;
    booking_id?: number;
    status?: number;
    created_date?: Date;
  };
  passenger_promo_codes_test: {
    id?: number;
    passenger_id?: number;
    updated_date?: Date;
    created_date?: Date;
    status?: number;
    booking_id?: number;
    promo_code_id?: number;
  };
  passenger_refunds: {
    conversation_id: string;
    payment_transaction_id: string;
    id: number;
    passenger_id: number;
    booking_id: number;
    booking_payment_id: number;
    status: number;
    created_date: Date;
    updated_date?: Date;
  };
  passenger_rewards: {
    created_at: Date;
    is_send?: boolean;
    reward_id: number;
    passenger_id: number;
    id: number;
    trip_id?: number;
  };
  passengers: {
    uuid?: any;
    id: number;
    last_login_time?: Date;
    last_known_point?: string;
    mobile_phone_country_code?: string;
    surname?: string;
    name?: string;
    one_signal_id?: string;
    language?: string;
    access_token?: string;
    last_update_time?: Date;
    score?: number;
    is_blocked?: boolean;
    mobile_phone?: string;
  };
  pg_stat_statements: {
    local_blks_dirtied?: number;
    local_blks_read?: number;
    local_blks_hit?: number;
    shared_blks_written?: number;
    shared_blks_dirtied?: number;
    shared_blks_read?: number;
    shared_blks_hit?: number;
    rows?: number;
    stddev_exec_time?: number;
    mean_exec_time?: number;
    max_exec_time?: number;
    min_exec_time?: number;
    calls?: number;
    total_exec_time?: number;
    stddev_plan_time?: number;
    dbid?: any;
    userid?: any;
    queryid?: number;
    plans?: number;
    total_plan_time?: number;
    query?: string;
    min_plan_time?: number;
    max_plan_time?: number;
    wal_bytes?: number;
    mean_plan_time?: number;
    toplevel?: boolean;
    wal_fpi?: number;
    wal_records?: number;
    blk_write_time?: number;
    blk_read_time?: number;
    temp_blks_written?: number;
    temp_blks_read?: number;
    local_blks_written?: number;
  };
  pg_stat_statements_info: {
    dealloc?: number;
    stats_reset?: Date;
  };
  places: {
    country?: string;
    main_text?: string;
    created_at?: Date;
    id: number;
    place_id?: string;
    location?: string;
    city?: string;
    street?: string;
    district?: string;
  };
  promo_code_properties: {
    discount_amount: number;
    id: number;
    promo_code_id: number;
    bonus_oil_prize?: number;
    created_at: Date;
  };
  promo_codes: {
    updated_date?: Date;
    code?: string;
    id: number;
    reward_id?: number;
    created_date?: Date;
    expire_date?: Date;
    active?: boolean;
    total_use_count?: number;
  };
  quicksight_dashboards: {
    source_id: string;
    name: string;
    auto_refresh?: boolean;
    refresh_button?: boolean;
    permission_key?: string;
    id: number;
    category_name: string;
  };
  rate_limiter_rules: {
    key: string;
    id: number;
    action: string;
    max_amount?: number;
    max_count: number;
  };
  rematch_ignored_driver_logs: {
    driver_id: number;
    created_date: Date;
    id: number;
    passenger_id: number;
    booking_id: number;
  };
  rewards: {
    start_date: Date;
    popup_button?: string;
    end_date?: Date;
    max_earning_per_user?: number;
    bonus_prize?: number;
    assigned_to_individual?: boolean;
    geofences?: any;
    vehicle_type?: number;
    is_promo_code_active: boolean;
    instant?: boolean;
    coupon_expire_day?: number;
    label: string;
    name: string;
    description?: string;
    image_url: string;
    notification?: string;
    coupon_type?: number;
    amount?: number;
    period_end?: any;
    period_start?: any;
    popup_title?: string;
    popup_description?: string;
    is_enabled?: boolean;
    ride_count?: number;
    id: number;
    type: number;
    target_group?: number;
  };
  scanned_qrs: {
    created_date: Date;
    mobile_phone_country_code?: string;
    created_app_id: number;
    id: number;
    mobile_phone?: string;
  };
  spatial_ref_sys: {
    srtext?: string;
    srid: number;
    auth_srid?: number;
    proj4text?: string;
    auth_name?: string;
  };
  support_center_event_types: {
    id: number;
    event_name?: string;
  };
  support_center_items: {
    created_at: Date;
    call_center_number?: string;
    created_by: number;
    updated_at?: Date;
    id: number;
    is_redirect_to_call_center: boolean;
    detail_en?: string;
    detail_tr?: string;
    name_tr: string;
    name_en: string;
    sort?: number;
    parent_id?: number;
    tags?: any;
    is_archived: boolean;
    app: number;
    updated_by?: number;
    type: number;
  };
  support_center_logs: {
    main_category_id?: number;
    is_redirect_call_center?: boolean;
    event_id?: number;
    created_date: Date;
    topic_id: number;
    sub_category_id?: number;
    user_id: number;
    user_type: number;
    id: number;
  };
  surge_config_logs: {
    updated_at: Date;
    id: number;
    new_value: string;
    current_value: string;
    updated_by: number;
    vehicle_type: number;
    fence: number;
    key: string;
    configuration_id: string;
  };
  suspend_rules: {
    create_date?: Date;
    driver_ban_reason_id: number;
    is_indefinite: boolean;
    id: number;
    suspend_day?: number;
    repeat_in_days?: number;
    message?: string;
    repeat_count?: number;
    tag?: any;
  };
  taxi_demands: {
    id: number;
    passenger_id: number;
    latitude: string;
    created_date?: Date;
    longitude: string;
  };
  taxi_driver_validation_error_logs: {
    plate?: string;
    vehicle_id?: number;
    driver_id: number;
    id: number;
    error_message?: string;
    created_at?: Date;
    tckn?: string;
  };
  trip_charges: {
    type: number;
    trip_id: number;
    fee: number;
    id: number;
  };
  trip_completion_logs: {
    id: number;
    created_date: Date;
    trip_id: number;
    user_id: number;
  };
  trip_details: {
    trip_id?: number;
    subscription_id?: number;
    id: number;
  };
  trip_motionless_log: {
    lat?: number;
    is_motionless: boolean;
    id: number;
    created_date: Date;
    trip_id: number;
    lon?: number;
  };
  trip_obstruction_reports: {
    created_date: Date;
    latitude: number;
    passenger_id: number;
    trip_id: number;
    type: number;
    id: number;
    longitude: number;
  };
  trip_review_feedbacks: {
    id: number;
    title: string;
    po_key?: string;
  };
  trip_reviews: {
    id: number;
    description?: string;
    created_date?: Date;
    feedbacks?: any;
    stars?: number;
    review_for: number;
    reviewer: number;
    trip_id: number;
  };
  trip_route_error_reports: {
    id: number;
    driver_id: number;
    trip_id: number;
    created_at: Date;
  };
  trip_share_location_logs: {
    trip_id: number;
    created_date?: Date;
    id: number;
    url?: string;
  };
  trips: {
    end_date?: Date;
    start_date?: Date;
    status: number;
    booking_id: number;
    passenger_id: number;
    driver_id: number;
    id: number;
    update_date?: Date;
    polyline?: string;
    vehicle_type?: number;
    is_fraud?: boolean;
    fraud_reason?: number;
    fraud_reasons?: any;
    start_geofence?: number;
    is_motionless?: boolean;
    destination?: string;
    passenger_route?: string;
    origin?: string;
    route?: string;
    end_point?: string;
    start_point?: string;
    everest_price?: number;
    depreciation_price?: number;
    oil_price?: number;
    price_total?: number;
    estimated_route?: string;
    distance?: number;
    duration?: number;
    payment_type?: number;
  };
  turkey_tax_offices: {
    city?: string;
    id: number;
    office?: string;
  };
  user_coupons: {
    amount?: number;
    is_selected: boolean;
    is_used: boolean;
    reward_id: number;
    user_type?: number;
    user_id?: number;
    id: number;
    expired_at?: Date;
    created_at: Date;
    created_by: number;
    is_canceled: boolean;
    used_at?: Date;
    code: string;
    bonus_prize?: number;
    total_amount?: number;
    booking_id?: number;
  };
  user_reference_codes: {
    created_at: Date;
    id: number;
    user_type: number;
    user_id: number;
    usage_reward_id?: number;
    share_reward_id?: number;
    code: string;
  };
  user_trip_info: {
    id: number;
    first_nonfraud_trip_date?: Date;
    first_trip_date?: Date;
    user_id: number;
    is_user_have_first_trip: boolean;
    is_user_have_first_nonfraud_trip: boolean;
    user_type: number;
  };
  vehicle_approve_logs: {
    vehicle_id?: number;
    to_state?: number;
    from_state?: number;
    admin_id?: number;
    update_date?: Date;
    id: number;
  };
  vehicle_configs: {
    oil_price_per_km: number;
    start_price: number;
    id: number;
    secondary_vehicle_option?: number;
    bridge_toll?: number;
    price_per_duration?: number;
    price_per_km: number;
    duration_per_km: number;
    vehicle_type: number;
  };
  vehicle_control_photos: {
    approver?: number;
    uploaded_date?: Date;
    approved_date?: Date;
    vehicle_id: number;
    is_approved?: boolean;
    confidence?: number;
    driver_id: number;
    id: number;
    photo: string;
  };
  vehicle_delivery_configs: {
    duration_per_km: number;
    vehicle_type: number;
    oil_price_per_km: number;
    start_price: number;
    price_per_km: number;
    id: number;
  };
  vehicle_photos: {
    photo: string;
    vehicle_id: number;
    id: number;
    created_date: Date;
  };
  vehicle_reject_reasons: {
    sort: number;
    id: number;
    is_push_enabled?: boolean;
    parent_id?: number;
    is_active?: boolean;
    push_text_en?: string;
    push_title_en?: string;
    push_text_tr?: string;
    push_title_tr?: string;
    reason?: string;
  };
  vehicles: {
    model: string;
    brand: string;
    is_in_use?: boolean;
    license_photo?: string;
    reject_reasons?: any;
    vehicle_registration_state?: number;
    type: number;
    year: number;
    driver_id: number;
    created_date?: Date;
    updated_date?: Date;
    id: number;
    admin_last_update_date?: Date;
    plate?: string;
    color: string;
    is_deleted?: boolean;
  };
  waypoints: {
    created_by?: number;
    location: string;
    obstruction_point: string;
    id: number;
    order?: number;
    created_date?: Date;
  };
  waypoints_log: {
    created_by?: number;
    id: number;
    waypoint_id: number;
    order?: number;
    is_deleted: boolean;
    created_date?: Date;
    obstruction_point: string;
    location: string;
  };
  years: {
    year: string;
    id: number;
  };
  zeus_call_logs: {
    admin_id: number;
    booking_id: number;
    id: number;
    driver_id: number;
    called_check_date?: Date;
  };
  zone_logs: {
    name: string;
    is_active: boolean;
    zone_id: number;
    change_type: number;
    updated_date?: Date;
    fence_id: number;
    polygon: string;
    point_index?: number;
    type: number;
    matching_distance?: number;
    is_archived?: boolean;
    id: number;
    admin_id: number;
  };
  zones: {
    matching_distance?: number;
    is_archived?: boolean;
    type: number;
    id: number;
    is_active: boolean;
    fence_id: number;
    point_index?: number;
    polygon: string;
    name: string;
  }
}

export type Tables = keyof DB;
export type Columns<T extends Tables> = keyof DB[T];