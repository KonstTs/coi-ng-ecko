export interface IPfTokenMarketData {
  current_price?: IPfTokensValueList;
  total_value_locked?: number;
  mcap_to_tvl_ratio?: number;
  fdv_to_tvl_ratio?: number;
  roi?: number;
  ath?: IPfTokensValueList;
  ath_change_percentage?: IPfTokensValueList;
  ath_date?: IPfTokensValueList;
  atl?: IPfTokensValueList;
  atl_change_percentage?: IPfTokensValueList;
  atl_date?: IPfTokensValueList;
  market_cap?: IPfTokensValueList;
  market_cap_rank?: number;
  fully_diluted_valuation?: IPfTokensValueList
  market_cap_fdv_ratio?: number;
  total_volume?: IPfTokensValueList;
  high_24h?: IPfTokensValueList;
  low_24h?: IPfTokensValueList;
  price_change_24h?: number;
  price_change_percentage_24h?: number;
  price_change_percentage_7d?: number;
  price_change_percentage_14d?: number;
  price_change_percentage_30d?: number;
  price_change_percentage_60d?: number;
  price_change_percentage_200d?: number;
  price_change_percentage_1y?: number;
  market_cap_change_24h?: number;
  market_cap_change_percentage_24h?: number;
  price_change_24h_in_currency?: IPfTokensValueList;
  price_change_percentage_1h_in_currency?: IPfTokensValueList;
  price_change_percentage_24h_in_currency?: IPfTokensValueList;
  price_change_percentage_14d_in_currency?: IPfTokensValueList;
  price_change_percentage_30d_in_currency?: IPfTokensValueList;
  price_change_percentage_60d_in_currency?: IPfTokensValueList;
  price_change_percentage_1y_in_currency?: IPfTokensValueList;
  market_cap_change_24h_in_currency?: IPfTokensValueList;
  market_cap_change_percentage_24h_in_currency?: IPfTokensValueList;
  total_supply?: number;
  max_supply?: number;
  circulating_supply?: number;
  last_updated?: Date;
};

export interface IPfTokenCommunityData {
  facebook_likes?: number;
  twitter_followers?: number;
  reddit_average_posts_48h?: number;
  reddit_average_comments_48h?: number;
  reddit_subscribers?: number;
  reddit_accounts_active_48h?: number;
  telegram_channel_user_count?: number
};

export interface IPfTokenDeveloperData {
  forks?: number;
  stars?: number;
  subscribers?: number;
  total_issues?: number;
  closed_issues?: number;
  pull_requests_merged?: number;
  pull_request_contributors?: number;
  code_additions_deletions_4_weeks?: {
    additions?: number;
    deletions?: number;
  };
  commit_count_4_weeks?: number;
  last_4_weeks_commit_activity_series?: any;
};


export interface IPfTokenImages {
  thumb?: string;
  small?: string;
  large?: string;
}

export interface IPfTokenTickers {
  base?: string;
    target?: string;
    market?: IPfTokenMarket;
    last?: number;
    volume?: number;
    converted_last?: IPfTokenConversions;
    converted_volume?: IPfTokenConversions;
    trust_score?: string;
    bid_ask_spread_percentage?: number;
    timestamp?: Date | string;
    last_traded_at?: Date | string;
    last_fetch_at?: Date | string;
    is_anomaly?: boolean;
    is_stale?: boolean;
    trade_url?: string;
    token_info_url?: string;
    coin_id?: string;
}

export interface IPfTokenMarket {
  name?: string;
  identifier?: string;
  has_trading_incentive?: false
}

export interface IPfTokenConversions {
  btc?: number;
  eth?: number;
  usd?: number
}


export interface IPfTokensValueList {
    aed?: number;
    ars?: number;
    aud?: number;
    bch?: number;
    bdt?: number;
    bhd?: number;
    bmd?: number;
    bnb?: number;
    brl?: number;
    btc?: number;
    cad?: number;
    chf?: number;
    clp?: number;
    cny?: number;
    czk?: number;
    dkk?: number;
    dot?: number;
    eos?: number;
    eth?: number;
    eur?: number;
    gbp?: number;
    gel?: number;
    hkd?: number;
    huf?: number;
    idr?: number;
    ils?: number;
    inr?: number;
    jpy?: number;
    krw?: number;
    kwd?: number;
    lkr?: number;
    ltc?: number;
    mmk?: number;
    mxn?: number;
    myr?: number;
    ngn?: number;
    nok?: number;
    nzd?: number;
    php?: number;
    pkr?: number;
    pln?: number;
    rub?: number;
    sar?: number;
    sek?: number;
    sgd?: number;
    thb?: number;
    try?: number;
    twd?: number;
    uah?: number;
    usd?: number;
    vef?: number;
    vnd?: number;
    xag?: number;
    xau?: number;
    xdr?: number;
    xlm?: number;
    xrp?: number;
    yfi?: number;
    zar?: number;
    bits?: number;
    link?: number;
    sats?: number;
  }