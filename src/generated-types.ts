export interface DB {
  surge_calculations: {
    surge_ratio: number;
    vehicle_type: number;
    fence: number;
    marker_color: string;
    map_color: string;
    h3: string;
    period_id: string;
    id: string;
    multiplier: number;
    surge_enabled: boolean;
  };
  surge_color_configurations: {
    vehicle_type: number;
    marker_colors?: any;
    map_colors?: any;
    fence: number;
  };
  surge_configuration_history: {
    created_at: Date;
    fence: number;
    vehicle_type: number;
    min_hadi_gidelim_count?: number;
    min_unique_hadi_gidelim_count?: number;
    max_unique_driver_count?: number;
    min_global_match_rate?: number;
    max_surge_ratio?: number;
    min_surge_ratio_adjustment?: number;
    min_surge_multiplier?: number;
    max_surge_multiplier?: number;
    min_h3_count_for_surge_groups?: number;
    surge_group_count?: number;
    id: string;
    period_id: string;
    surge_configuration_id: string;
  };
  surge_configurations: {
    surge_group_count?: number;
    min_unique_hadi_gidelim_count?: number;
    min_global_match_rate?: number;
    min_surge_multiplier?: number;
    max_surge_multiplier?: number;
    max_surge_ratio?: number;
    max_unique_driver_count?: number;
    min_h3_count_for_surge_groups?: number;
    min_surge_ratio_adjustment?: number;
    fence: number;
    vehicle_type: number;
    id: string;
    min_hadi_gidelim_count?: number;
  };
  surge_driver_locations: {
    period_id: string;
    id: string;
    driver_id: number;
    h3: string;
    location_count: number;
  };
  surge_driver_notification_ids: {
    driver_id: number;
    one_signal_id: string;
    period_id: string;
  };
  surge_driver_push_notification_ids: {
    driver_id: number;
    period_id: string;
    one_signal_id: string;
  };
  surge_events: {
    event_type: number;
    h3: string;
    vehicle_type: number;
    period_id: string;
    fence: number;
    id: string;
    passenger_id: number;
    timestamp: Date;
    booking_id: number;
  };
  surge_events_aggregated: {
    id: string;
    unique_hadi_gidelim_count: number;
    h3: string;
    unique_match_count: number;
    vehicle_type: number;
    fence: number;
    hadi_gidelim_count: number;
    match_count: number;
    period_id: string;
  };
  surge_global_configurations: {
    id: string;
    surge_enabled: boolean;
  };
  surge_period_calculations: {
    start_date: Date;
    period_id: string;
    end_date?: Date;
  };
  surge_period_unique_hadi_gidelim: {
    hash: string;
  };
  surge_period_unique_matchings: {
    hash: string;
  };
  surge_periods: {
    status: number;
    end_date: Date;
    start_date: Date;
    id: string;
    period_interval: number;
  }
}

export type Tables = keyof DB;
export type Columns<T extends Tables> = keyof DB[T];
