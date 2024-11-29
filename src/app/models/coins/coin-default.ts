import { IPfTokenCommunityData, IPfTokenDeveloperData, IPfTokenImages, IPfTokenMarketData, IPfTokensValueList, IPfTokenTickers } from "./token";

export interface IPfCoinDefault {
        id: string;
        symbol?: string;
        name?: string;
        web_slug?: string;
        asset_platform_id?: string;
        platforms?: any;
        detail_platforms?: any;
        block_time_in_minutes?: number;
        hashing_algorithm?: string;
        categories?: string[];
        preview_listing?: boolean;
        public_notice?: string;
        additional_notices?: string[];
        localization?: any;
        description?: any;
        links?: any;
        twitter_screen_name?: string;
        facebook_username?: string;
        bitcointalk_thread_identifier?: string;
        telegram_channel_identifier?: string;
        subreddit_url?: string;
        repos_url?: any;
        image?: IPfTokenImages;
        country_origin?: string;
        genesis_date?: Date | string;
        sentiment_votes_up_percentage?: number;
        sentiment_votes_down_percentage?: number;
        watchlist_portfolio_users?: number;
        market_cap_rank?: number;
        market_data?: IPfTokenMarketData;
        community_data?: IPfTokenCommunityData;
        developer_data?: IPfTokenDeveloperData;
        status_updates?: any;
        last_updated?: Date | string;
        tickers?: IPfTokenTickers[]
}

