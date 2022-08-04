/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/cards": {
    get: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.cards.created_at"];
          name?: parameters["rowFilter.cards.name"];
          description?: parameters["rowFilter.cards.description"];
          labels?: parameters["rowFilter.cards.labels"];
          cover?: parameters["rowFilter.cards.cover"];
          id?: parameters["rowFilter.cards.id"];
          list_id?: parameters["rowFilter.cards.list_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["cards"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** cards */
          cards?: definitions["cards"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.cards.created_at"];
          name?: parameters["rowFilter.cards.name"];
          description?: parameters["rowFilter.cards.description"];
          labels?: parameters["rowFilter.cards.labels"];
          cover?: parameters["rowFilter.cards.cover"];
          id?: parameters["rowFilter.cards.id"];
          list_id?: parameters["rowFilter.cards.list_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.cards.created_at"];
          name?: parameters["rowFilter.cards.name"];
          description?: parameters["rowFilter.cards.description"];
          labels?: parameters["rowFilter.cards.labels"];
          cover?: parameters["rowFilter.cards.cover"];
          id?: parameters["rowFilter.cards.id"];
          list_id?: parameters["rowFilter.cards.list_id"];
        };
        body: {
          /** cards */
          cards?: definitions["cards"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/lists": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.lists.id"];
          created_at?: parameters["rowFilter.lists.created_at"];
          name?: parameters["rowFilter.lists.name"];
          board_id?: parameters["rowFilter.lists.board_id"];
          cover?: parameters["rowFilter.lists.cover"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["lists"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** lists */
          lists?: definitions["lists"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.lists.id"];
          created_at?: parameters["rowFilter.lists.created_at"];
          name?: parameters["rowFilter.lists.name"];
          board_id?: parameters["rowFilter.lists.board_id"];
          cover?: parameters["rowFilter.lists.cover"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.lists.id"];
          created_at?: parameters["rowFilter.lists.created_at"];
          name?: parameters["rowFilter.lists.name"];
          board_id?: parameters["rowFilter.lists.board_id"];
          cover?: parameters["rowFilter.lists.cover"];
        };
        body: {
          /** lists */
          lists?: definitions["lists"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/boards": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.boards.id"];
          created_at?: parameters["rowFilter.boards.created_at"];
          name?: parameters["rowFilter.boards.name"];
          cover?: parameters["rowFilter.boards.cover"];
          user_id?: parameters["rowFilter.boards.user_id"];
          is_private?: parameters["rowFilter.boards.is_private"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["boards"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** boards */
          boards?: definitions["boards"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.boards.id"];
          created_at?: parameters["rowFilter.boards.created_at"];
          name?: parameters["rowFilter.boards.name"];
          cover?: parameters["rowFilter.boards.cover"];
          user_id?: parameters["rowFilter.boards.user_id"];
          is_private?: parameters["rowFilter.boards.is_private"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.boards.id"];
          created_at?: parameters["rowFilter.boards.created_at"];
          name?: parameters["rowFilter.boards.name"];
          cover?: parameters["rowFilter.boards.cover"];
          user_id?: parameters["rowFilter.boards.user_id"];
          is_private?: parameters["rowFilter.boards.is_private"];
        };
        body: {
          /** boards */
          boards?: definitions["boards"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  cards: {
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: text */
    name?: string;
    /** Format: text */
    description?: string;
    /** Format: ARRAY */
    labels?: unknown[];
    /** Format: text */
    cover?: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `lists.id`.<fk table='lists' column='id'/>
     */
    list_id: string;
  };
  lists: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: character varying */
    name?: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `boards.id`.<fk table='boards' column='id'/>
     */
    board_id: string;
    /** Format: json */
    cover?: unknown;
  };
  boards: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: character varying */
    name?: string;
    /** Format: jsonb */
    cover?: {
      /** Format: text */

      source: string;
    };
    /**
     * Format: uuid
     * @default auth.uid()
     */
    user_id?: string;
    /**
     * Format: boolean
     * @default false
     */
    is_private?: boolean;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description cards */
  "body.cards": definitions["cards"];
  /** Format: timestamp with time zone */
  "rowFilter.cards.created_at": string;
  /** Format: text */
  "rowFilter.cards.name": string;
  /** Format: text */
  "rowFilter.cards.description": string;
  /** Format: ARRAY */
  "rowFilter.cards.labels": string;
  /** Format: text */
  "rowFilter.cards.cover": string;
  /** Format: uuid */
  "rowFilter.cards.id": string;
  /** Format: uuid */
  "rowFilter.cards.list_id": string;
  /** @description lists */
  "body.lists": definitions["lists"];
  /** Format: uuid */
  "rowFilter.lists.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.lists.created_at": string;
  /** Format: character varying */
  "rowFilter.lists.name": string;
  /** Format: uuid */
  "rowFilter.lists.board_id": string;
  /** Format: json */
  "rowFilter.lists.cover": string;
  /** @description boards */
  "body.boards": definitions["boards"];
  /** Format: uuid */
  "rowFilter.boards.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.boards.created_at": string;
  /** Format: character varying */
  "rowFilter.boards.name": string;
  /** Format: jsonb */
  "rowFilter.boards.cover": string;
  /** Format: uuid */
  "rowFilter.boards.user_id": string;
  /** Format: boolean */
  "rowFilter.boards.is_private": string;
}

export interface operations {}

export interface external {}
