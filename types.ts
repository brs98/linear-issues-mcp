/* eslint-disable @typescript-eslint/no-explicit-any */

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Represents a date and time in ISO 8601 format. Accepts shortcuts like `2021` to represent midnight Fri Jan 01 2021. Also accepts ISO 8601 durations strings which are added to the current date to create the represented date (e.g '-P2W1D' represents the date that was two weeks and 1 day ago) */
  DateTime: Date;
  /** Represents a date and time in ISO 8601 format. Accepts shortcuts like `2021` to represent midnight Fri Jan 01 2021. Also accepts ISO 8601 durations strings which are added to the current date to create the represented date (e.g '-P2W1D' represents the date that was two weeks and 1 day ago) */
  DateTimeOrDuration: Date | string;
  /** The `JSON` scalar type represents arbitrary values as *stringified* JSON */
  JSON: Record<string, unknown>;
  /** The `JSONObject` scalar type represents arbitrary values as *embedded* JSON */
  JSONObject: any;
  /** Represents a date in ISO 8601 format. Accepts shortcuts like `2021` to represent midnight Fri Jan 01 2021. Also accepts ISO 8601 durations strings which are added to the current date to create the represented date (e.g '-P2W1D' represents the date that was two weeks and 1 day ago) */
  TimelessDate: any;
  /** Represents a date in ISO 8601 format or a duration. Accepts shortcuts like `2021` to represent midnight Fri Jan 01 2021. Also accepts ISO 8601 durations strings (e.g '-P2W1D'), which are not converted to dates. */
  TimelessDateOrDuration: any;
  /** A universally unique identifier as specified by RFC 4122. */
  UUID: any;
};

/** Comparator for optional dates. */
export type NullableDateComparator = {
  /** Equals constraint. */
  eq?: Scalars['DateTimeOrDuration'];
  /** Greater-than constraint. Matches any values that are greater than the given value. */
  gt?: Scalars['DateTimeOrDuration'];
  /** Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value. */
  gte?: Scalars['DateTimeOrDuration'];
  /** In-array constraint. */
  in?: Array<Scalars['DateTimeOrDuration']>;
  /** Less-than constraint. Matches any values that are less than the given value. */
  lt?: Scalars['DateTimeOrDuration'];
  /** Less-than-or-equal constraint. Matches any values that are less than or equal to the given value. */
  lte?: Scalars['DateTimeOrDuration'];
  /** Not-equals constraint. */
  neq?: Scalars['DateTimeOrDuration'];
  /** Not-in-array constraint. */
  nin?: Array<Scalars['DateTimeOrDuration']>;
  /** Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values. */
  null?: Scalars['Boolean'];
};

export enum CyclePeriod {
  After = 'after',
  Before = 'before',
  During = 'during',
}

export type CyclePeriodComparator = {
  /** Equals constraint. */
  eq?: CyclePeriod;
  /** In-array constraint. */
  in?: Array<CyclePeriod>;
  /** Not-equals constraint. */
  neq?: CyclePeriod;
  /** Not-in-array constraint. */
  nin?: Array<CyclePeriod>;
  /** Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values. */
  null?: Scalars['Boolean'];
};

export type BooleanComparator = {
  /** Equals constraint. */
  eq?: Scalars['Boolean'];
  /** Not equals constraint. */
  neq?: Scalars['Boolean'];
};

export type DateComparator = {
  /** Equals constraint. */
  eq?: Scalars['DateTimeOrDuration'];
  /** Greater-than constraint. Matches any values that are greater than the given value. */
  gt?: Scalars['DateTimeOrDuration'];
  /** Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value. */
  gte?: Scalars['DateTimeOrDuration'];
  /** In-array constraint. */
  in?: Array<Scalars['DateTimeOrDuration']>;
  /** Less-than constraint. Matches any values that are less than the given value. */
  lt?: Scalars['DateTimeOrDuration'];
  /** Less-than-or-equal constraint. Matches any values that are less than or equal to the given value. */
  lte?: Scalars['DateTimeOrDuration'];
  /** Not-equals constraint. */
  neq?: Scalars['DateTimeOrDuration'];
  /** Not-in-array constraint. */
  nin?: Array<Scalars['DateTimeOrDuration']>;
};

export type IdComparator = {
  /** Equals constraint. */
  eq?: Scalars['ID'];
  /** In-array constraint. */
  in?: Array<Scalars['ID']>;
  /** Not-equals constraint. */
  neq?: Scalars['ID'];
  /** Not-in-array constraint. */
  nin?: Array<Scalars['ID']>;
};

export type SourceTypeComparator = {
  /** Contains constraint. Matches any values that contain the given string. */
  contains?: Scalars['String'];
  /** Contains case insensitive constraint. Matches any values that contain the given string case insensitive. */
  containsIgnoreCase?: Scalars['String'];
  /** Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive. */
  containsIgnoreCaseAndAccent?: Scalars['String'];
  /** Ends with constraint. Matches any values that end with the given string. */
  endsWith?: Scalars['String'];
  /** Equals constraint. */
  eq?: Scalars['String'];
  /** Equals case insensitive. Matches any values that matches the given string case insensitive. */
  eqIgnoreCase?: Scalars['String'];
  /** In-array constraint. */
  in?: Array<Scalars['String']>;
  /** Not-equals constraint. */
  neq?: Scalars['String'];
  /** Not-equals case insensitive. Matches any values that don't match the given string case insensitive. */
  neqIgnoreCase?: Scalars['String'];
  /** Not-in-array constraint. */
  nin?: Array<Scalars['String']>;
  /** Doesn't contain constraint. Matches any values that don't contain the given string. */
  notContains?: Scalars['String'];
  /** Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive. */
  notContainsIgnoreCase?: Scalars['String'];
  /** Doesn't end with constraint. Matches any values that don't end with the given string. */
  notEndsWith?: Scalars['String'];
  /** Doesn't start with constraint. Matches any values that don't start with the given string. */
  notStartsWith?: Scalars['String'];
  /** Starts with constraint. Matches any values that start with the given string. */
  startsWith?: Scalars['String'];
  /** Starts with case insensitive constraint. Matches any values that start with the given string. */
  startsWithIgnoreCase?: Scalars['String'];
};

export type AttachmentFilter = {
  /** Compound filters, all of which need to be matched by the attachment. */
  and?: Array<AttachmentFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the attachments creator must satisfy. */
  creator?: NullableUserFilter;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Compound filters, one of which need to be matched by the attachment. */
  or?: Array<AttachmentFilter>;
  /** Comparator for the source type. */
  sourceType?: SourceTypeComparator;
  /** Comparator for the subtitle. */
  subtitle?: NullableStringComparator;
  /** Comparator for the title. */
  title?: StringComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
  /** Comparator for the url. */
  url?: StringComparator;
};

export type NumberComparator = {
  /** Equals constraint. */
  eq?: Scalars['Float'];
  /** Greater-than constraint. Matches any values that are greater than the given value. */
  gt?: Scalars['Float'];
  /** Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value. */
  gte?: Scalars['Float'];
  /** In-array constraint. */
  in?: Array<Scalars['Float']>;
  /** Less-than constraint. Matches any values that are less than the given value. */
  lt?: Scalars['Float'];
  /** Less-than-or-equal constraint. Matches any values that are less than or equal to the given value. */
  lte?: Scalars['Float'];
  /** Not-equals constraint. */
  neq?: Scalars['Float'];
  /** Not-in-array constraint. */
  nin?: Array<Scalars['Float']>;
};

export type NullableStringComparator = {
  /** Contains constraint. Matches any values that contain the given string. */
  contains?: Scalars['String'];
  /** Contains case insensitive constraint. Matches any values that contain the given string case insensitive. */
  containsIgnoreCase?: Scalars['String'];
  /** Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive. */
  containsIgnoreCaseAndAccent?: Scalars['String'];
  /** Ends with constraint. Matches any values that end with the given string. */
  endsWith?: Scalars['String'];
  /** Equals constraint. */
  eq?: Scalars['String'];
  /** Equals case insensitive. Matches any values that matches the given string case insensitive. */
  eqIgnoreCase?: Scalars['String'];
  /** In-array constraint. */
  in?: Array<Scalars['String']>;
  /** Not-equals constraint. */
  neq?: Scalars['String'];
  /** Not-equals case insensitive. Matches any values that don't match the given string case insensitive. */
  neqIgnoreCase?: Scalars['String'];
  /** Not-in-array constraint. */
  nin?: Array<Scalars['String']>;
  /** Doesn't contain constraint. Matches any values that don't contain the given string. */
  notContains?: Scalars['String'];
  /** Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive. */
  notContainsIgnoreCase?: Scalars['String'];
  /** Doesn't end with constraint. Matches any values that don't end with the given string. */
  notEndsWith?: Scalars['String'];
  /** Doesn't start with constraint. Matches any values that don't start with the given string. */
  notStartsWith?: Scalars['String'];
  /** Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values. */
  null?: Scalars['Boolean'];
  /** Starts with constraint. Matches any values that start with the given string. */
  startsWith?: Scalars['String'];
  /** Starts with case insensitive constraint. Matches any values that start with the given string. */
  startsWithIgnoreCase?: Scalars['String'];
};

export type StringComparator = {
  /** Contains constraint. Matches any values that contain the given string. */
  contains?: Scalars['String'];
  /** Contains case insensitive constraint. Matches any values that contain the given string case insensitive. */
  containsIgnoreCase?: Scalars['String'];
  /** Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive. */
  containsIgnoreCaseAndAccent?: Scalars['String'];
  /** Ends with constraint. Matches any values that end with the given string. */
  endsWith?: Scalars['String'];
  /** Equals constraint. */
  eq?: Scalars['String'];
  /** Equals case insensitive. Matches any values that matches the given string case insensitive. */
  eqIgnoreCase?: Scalars['String'];
  /** In-array constraint. */
  in?: Array<Scalars['String']>;
  /** Not-equals constraint. */
  neq?: Scalars['String'];
  /** Not-equals case insensitive. Matches any values that don't match the given string case insensitive. */
  neqIgnoreCase?: Scalars['String'];
  /** Not-in-array constraint. */
  nin?: Array<Scalars['String']>;
  /** Doesn't contain constraint. Matches any values that don't contain the given string. */
  notContains?: Scalars['String'];
  /** Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive. */
  notContainsIgnoreCase?: Scalars['String'];
  /** Doesn't end with constraint. Matches any values that don't end with the given string. */
  notEndsWith?: Scalars['String'];
  /** Doesn't start with constraint. Matches any values that don't start with the given string. */
  notStartsWith?: Scalars['String'];
  /** Starts with constraint. Matches any values that start with the given string. */
  startsWith?: Scalars['String'];
  /** Starts with case insensitive constraint. Matches any values that start with the given string. */
  startsWithIgnoreCase?: Scalars['String'];
};

export type AttachmentCollectionFilter = {
  /** Compound filters, all of which need to be matched by the attachment. */
  and?: Array<AttachmentCollectionFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the attachments creator must satisfy. */
  creator?: NullableUserFilter;
  /** Filters that needs to be matched by all attachments. */
  every?: AttachmentFilter;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the collection length. */
  length?: NumberComparator;
  /** Compound filters, one of which need to be matched by the attachment. */
  or?: Array<AttachmentCollectionFilter>;
  /** Filters that needs to be matched by some attachments. */
  some?: AttachmentFilter;
  /** Comparator for the source type. */
  sourceType?: SourceTypeComparator;
  /** Comparator for the subtitle. */
  subtitle?: NullableStringComparator;
  /** Comparator for the title. */
  title?: StringComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
  /** Comparator for the url. */
  url?: StringComparator;
};

export type UserFilter = {
  /** Comparator for the user's activity status. */
  active?: BooleanComparator;
  /** Comparator for the user's admin status. */
  admin?: BooleanComparator;
  /** Compound filters, all of which need to be matched by the user. */
  and?: Array<UserFilter>;
  /** Comparator for the user's app status. */
  app?: BooleanComparator;
  /** Filters that the users assigned issues must satisfy. */
  assignedIssues?: IssueCollectionFilter;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Comparator for the user's display name. */
  displayName?: StringComparator;
  /** Comparator for the user's email. */
  email?: StringComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the user's invited status. */
  invited?: BooleanComparator;
  /** Filter based on the currently authenticated user. Set to true to filter for the authenticated user, false for any other user. */
  isMe?: BooleanComparator;
  /** Comparator for the user's name. */
  name?: StringComparator;
  /** Compound filters, one of which need to be matched by the user. */
  or?: Array<UserFilter>;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type InitiativeFilter = {
  /** Compound filters, all of which need to be matched by the initiative. */
  and?: Array<InitiativeFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the initiative creator must satisfy. */
  creator?: UserFilter;
  /** Comparator for the initiative health: onTrack, atRisk, offTrack */
  health?: StringComparator;
  /** Comparator for the initiative health (with age): onTrack, atRisk, offTrack, outdated, noUpdate */
  healthWithAge?: StringComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the initiative name. */
  name?: StringComparator;
  /** Compound filters, one of which need to be matched by the initiative. */
  or?: Array<InitiativeFilter>;
  /** Comparator for the initiative slug ID. */
  slugId?: StringComparator;
  /** Comparator for the initiative status: Planned, Active, Completed */
  status?: StringComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type NullableTeamFilter = {
  /** Compound filters, all of which need to be matched by the team. */
  and?: Array<NullableTeamFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Comparator for the team description. */
  description?: NullableStringComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Filters that the teams issues must satisfy. */
  issues?: IssueCollectionFilter;
  /** Comparator for the team key. */
  key?: StringComparator;
  /** Comparator for the team name. */
  name?: StringComparator;
  /** Filter based on the existence of the relation. */
  null?: Scalars['Boolean'];
  /** Compound filters, one of which need to be matched by the team. */
  or?: Array<NullableTeamFilter>;
  /** Filters that the teams parent must satisfy. */
  parent?: NullableTeamFilter;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};
export type TeamFilter = {
  /** Compound filters, all of which need to be matched by the team. */
  and?: Array<TeamFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Comparator for the team description. */
  description?: NullableStringComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Filters that the teams issues must satisfy. */
  issues?: IssueCollectionFilter;
  /** Comparator for the team key. */
  key?: StringComparator;
  /** Comparator for the team name. */
  name?: StringComparator;
  /** Compound filters, one of which need to be matched by the team. */
  or?: Array<TeamFilter>;
  /** Filters that the teams parent must satisfy. */
  parent?: NullableTeamFilter;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type TeamCollectionFilter = {
  /** Compound filters, all of which need to be matched by the team. */
  and?: Array<TeamCollectionFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that needs to be matched by all teams. */
  every?: TeamFilter;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the collection length. */
  length?: NumberComparator;
  /** Compound filters, one of which need to be matched by the team. */
  or?: Array<TeamCollectionFilter>;
  /** Filters that needs to be matched by some teams. */
  some?: TeamFilter;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type ProjectMilestoneCollectionFilter = {
  /** Compound filters, all of which need to be matched by the milestone. */
  and?: Array<ProjectMilestoneCollectionFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that needs to be matched by all milestones. */
  every?: ProjectMilestoneFilter;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the collection length. */
  length?: NumberComparator;
  /** Comparator for the project milestone name. */
  name?: NullableStringComparator;
  /** Compound filters, one of which need to be matched by the milestone. */
  or?: Array<ProjectMilestoneCollectionFilter>;
  /** Filters that needs to be matched by some milestones. */
  some?: ProjectMilestoneFilter;
  /** Comparator for the project milestone target date. */
  targetDate?: NullableDateComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type ProjectMilestoneFilter = {
  /** Compound filters, all of which need to be matched by the project milestone. */
  and?: Array<ProjectMilestoneFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the project milestone name. */
  name?: NullableStringComparator;
  /** Compound filters, one of which need to be matched by the project milestone. */
  or?: Array<ProjectMilestoneFilter>;
  /** Comparator for the project milestone target date. */
  targetDate?: NullableDateComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type RelationExistsComparator = {
  /** Equals constraint. */
  eq?: Scalars['Boolean'];
  /** Not equals constraint. */
  neq?: Scalars['Boolean'];
};

export type InitiativeCollectionFilter = {
  /** Compound filters, all of which need to be matched by the initiative. */
  and?: Array<InitiativeCollectionFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the initiative creator must satisfy. */
  creator?: UserFilter;
  /** Filters that needs to be matched by all initiatives. */
  every?: InitiativeFilter;
  /** Comparator for the initiative health: onTrack, atRisk, offTrack */
  health?: StringComparator;
  /** Comparator for the initiative health (with age): onTrack, atRisk, offTrack, outdated, noUpdate */
  healthWithAge?: StringComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the collection length. */
  length?: NumberComparator;
  /** Comparator for the initiative name. */
  name?: StringComparator;
  /** Compound filters, one of which need to be matched by the initiative. */
  or?: Array<InitiativeCollectionFilter>;
  /** Comparator for the initiative slug ID. */
  slugId?: StringComparator;
  /** Filters that needs to be matched by some initiatives. */
  some?: InitiativeFilter;
  /** Comparator for the initiative status: Planned, Active, Completed */
  status?: StringComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type NullableTemplateFilter = {
  /** Compound filters, all of which need to be matched by the template. */
  and?: Array<NullableTemplateFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the template's name. */
  name?: StringComparator;
  /** Filter based on the existence of the relation. */
  null?: Scalars['Boolean'];
  /** Compound filters, one of which need to be matched by the template. */
  or?: Array<NullableTemplateFilter>;
  /** Comparator for the template's type. */
  type?: StringComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type UserCollectionFilter = {
  /** Comparator for the user's activity status. */
  active?: BooleanComparator;
  /** Comparator for the user's admin status. */
  admin?: BooleanComparator;
  /** Compound filters, all of which need to be matched by the user. */
  and?: Array<UserCollectionFilter>;
  /** Comparator for the user's app status. */
  app?: BooleanComparator;
  /** Filters that the users assigned issues must satisfy. */
  assignedIssues?: IssueCollectionFilter;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Comparator for the user's display name. */
  displayName?: StringComparator;
  /** Comparator for the user's email. */
  email?: StringComparator;
  /** Filters that needs to be matched by all users. */
  every?: UserFilter;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the user's invited status. */
  invited?: BooleanComparator;
  /** Filter based on the currently authenticated user. Set to true to filter for the authenticated user, false for any other user. */
  isMe?: BooleanComparator;
  /** Comparator for the collection length. */
  length?: NumberComparator;
  /** Comparator for the user's name. */
  name?: StringComparator;
  /** Compound filters, one of which need to be matched by the user. */
  or?: Array<UserCollectionFilter>;
  /** Filters that needs to be matched by some users. */
  some?: UserFilter;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type NullableNumberComparator = {
  /** Equals constraint. */
  eq?: Scalars['Float'];
  /** Greater-than constraint. Matches any values that are greater than the given value. */
  gt?: Scalars['Float'];
  /** Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value. */
  gte?: Scalars['Float'];
  /** In-array constraint. */
  in?: Array<Scalars['Float']>;
  /** Less-than constraint. Matches any values that are less than the given value. */
  lt?: Scalars['Float'];
  /** Less-than-or-equal constraint. Matches any values that are less than or equal to the given value. */
  lte?: Scalars['Float'];
  /** Not-equals constraint. */
  neq?: Scalars['Float'];
  /** Not-in-array constraint. */
  nin?: Array<Scalars['Float']>;
  /** Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values. */
  null?: Scalars['Boolean'];
};

export type NullableCycleFilter = {
  /** Compound filters, all of which need to be matched by the cycle. */
  and?: Array<NullableCycleFilter>;
  /** Comparator for the cycle completed at date. */
  completedAt?: DateComparator;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Comparator for the cycle ends at date. */
  endsAt?: DateComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the filtering active cycle. */
  isActive?: BooleanComparator;
  /** Comparator for the filtering future cycles. */
  isFuture?: BooleanComparator;
  /** Comparator for filtering for whether the cycle is currently in cooldown. */
  isInCooldown?: BooleanComparator;
  /** Comparator for the filtering next cycle. */
  isNext?: BooleanComparator;
  /** Comparator for the filtering past cycles. */
  isPast?: BooleanComparator;
  /** Comparator for the filtering previous cycle. */
  isPrevious?: BooleanComparator;
  /** Filters that the cycles issues must satisfy. */
  issues?: IssueCollectionFilter;
  /** Comparator for the cycle name. */
  name?: StringComparator;
  /** Filter based on the existence of the relation. */
  null?: Scalars['Boolean'];
  /** Comparator for the cycle number. */
  number?: NumberComparator;
  /** Compound filters, one of which need to be matched by the cycle. */
  or?: Array<NullableCycleFilter>;
  /** Comparator for the cycle start date. */
  startsAt?: DateComparator;
  /** Filters that the cycles team must satisfy. */
  team?: TeamFilter;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type NullableTimelessDateComparator = {
  /** Equals constraint. */
  eq?: Scalars['TimelessDateOrDuration'];
  /** Greater-than constraint. Matches any values that are greater than the given value. */
  gt?: Scalars['TimelessDateOrDuration'];
  /** Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value. */
  gte?: Scalars['TimelessDateOrDuration'];
  /** In-array constraint. */
  in?: Array<Scalars['TimelessDateOrDuration']>;
  /** Less-than constraint. Matches any values that are less than the given value. */
  lt?: Scalars['TimelessDateOrDuration'];
  /** Less-than-or-equal constraint. Matches any values that are less than or equal to the given value. */
  lte?: Scalars['TimelessDateOrDuration'];
  /** Not-equals constraint. */
  neq?: Scalars['TimelessDateOrDuration'];
  /** Not-in-array constraint. */
  nin?: Array<Scalars['TimelessDateOrDuration']>;
  /** Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values. */
  null?: Scalars['Boolean'];
};

export type EstimateComparator = {
  /** Compound filters, one of which need to be matched by the estimate. */
  and?: Array<NullableNumberComparator>;
  /** Equals constraint. */
  eq?: Scalars['Float'];
  /** Greater-than constraint. Matches any values that are greater than the given value. */
  gt?: Scalars['Float'];
  /** Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value. */
  gte?: Scalars['Float'];
  /** In-array constraint. */
  in?: Array<Scalars['Float']>;
  /** Less-than constraint. Matches any values that are less than the given value. */
  lt?: Scalars['Float'];
  /** Less-than-or-equal constraint. Matches any values that are less than or equal to the given value. */
  lte?: Scalars['Float'];
  /** Not-equals constraint. */
  neq?: Scalars['Float'];
  /** Not-in-array constraint. */
  nin?: Array<Scalars['Float']>;
  /** Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values. */
  null?: Scalars['Boolean'];
  /** Compound filters, all of which need to be matched by the estimate. */
  or?: Array<NullableNumberComparator>;
};

export type IssueLabelFilter = {
  /** Compound filters, all of which need to be matched by the label. */
  and?: Array<IssueLabelFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the issue labels creator must satisfy. */
  creator?: NullableUserFilter;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the name. */
  name?: StringComparator;
  /** Compound filters, one of which need to be matched by the label. */
  or?: Array<IssueLabelFilter>;
  /** Filters that the issue label's parent label must satisfy. */
  parent?: IssueLabelFilter;
  /** Filters that the issue labels team must satisfy. */
  team?: NullableTeamFilter;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type IssueLabelCollectionFilter = {
  /** Compound filters, all of which need to be matched by the label. */
  and?: Array<IssueLabelCollectionFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the issue labels creator must satisfy. */
  creator?: NullableUserFilter;
  /** Filters that needs to be matched by all issue labels. */
  every?: IssueLabelFilter;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the collection length. */
  length?: NumberComparator;
  /** Comparator for the name. */
  name?: StringComparator;
  /** Compound filters, one of which need to be matched by the label. */
  or?: Array<IssueLabelCollectionFilter>;
  /** Filters that the issue label's parent label must satisfy. */
  parent?: IssueLabelFilter;
  /** Filters that needs to be matched by some issue labels. */
  some?: IssueLabelFilter;
  /** Filters that the issue labels team must satisfy. */
  team?: NullableTeamFilter;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type ProjectUpdatesFilter = {
  /** Compound filters, all of which need to be matched by the project updates. */
  and?: Array<ProjectUpdatesFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Comparator for the project update health. */
  health?: StringComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Compound filters, one of which need to be matched by the project updates. */
  or?: Array<ProjectUpdatesFilter>;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type ProjectUpdatesCollectionFilter = {
  /** Compound filters, all of which need to be matched by the project update. */
  and?: Array<ProjectUpdatesCollectionFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that needs to be matched by all updates. */
  every?: ProjectUpdatesFilter;
  /** Comparator for the project update health. */
  health?: StringComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the collection length. */
  length?: NumberComparator;
  /** Compound filters, one of which need to be matched by the update. */
  or?: Array<ProjectUpdatesCollectionFilter>;
  /** Filters that needs to be matched by some updates. */
  some?: ProjectUpdatesFilter;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type RoadmapFilter = {
  /** Compound filters, all of which need to be matched by the roadmap. */
  and?: Array<RoadmapFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the roadmap creator must satisfy. */
  creator?: UserFilter;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the roadmap name. */
  name?: StringComparator;
  /** Compound filters, one of which need to be matched by the roadmap. */
  or?: Array<RoadmapFilter>;
  /** Comparator for the roadmap slug ID. */
  slugId?: StringComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type RoadmapCollectionFilter = {
  /** Compound filters, all of which need to be matched by the roadmap. */
  and?: Array<RoadmapCollectionFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the roadmap creator must satisfy. */
  creator?: UserFilter;
  /** Filters that needs to be matched by all roadmaps. */
  every?: RoadmapFilter;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the collection length. */
  length?: NumberComparator;
  /** Comparator for the roadmap name. */
  name?: StringComparator;
  /** Compound filters, one of which need to be matched by the roadmap. */
  or?: Array<RoadmapCollectionFilter>;
  /** Comparator for the roadmap slug ID. */
  slugId?: StringComparator;
  /** Filters that needs to be matched by some roadmaps. */
  some?: RoadmapFilter;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type ContentComparator = {
  /** [Internal] Contains constraint. */
  contains?: Scalars['String'];
  /** [Internal] Not-contains constraint. */
  notContains?: Scalars['String'];
};

export type NullableProjectFilter = {
  /** Filters that the project's team must satisfy. */
  accessibleTeams?: TeamCollectionFilter;
  /** Compound filters, all of which need to be matched by the project. */
  and?: Array<NullableProjectFilter>;
  /** Comparator for the project cancelation date. */
  canceledAt?: NullableDateComparator;
  /** Comparator for the project completion date. */
  completedAt?: NullableDateComparator;
  /** Filters that the project's completed milestones must satisfy. */
  completedProjectMilestones?: ProjectMilestoneCollectionFilter;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the projects creator must satisfy. */
  creator?: UserFilter;
  /** Count of customers */
  customerCount?: NumberComparator;
  /** Comparator for filtering projects which are blocked. */
  hasBlockedByRelations?: RelationExistsComparator;
  /** Comparator for filtering projects which are blocking. */
  hasBlockingRelations?: RelationExistsComparator;
  /** [Deprecated] Comparator for filtering projects which this is depended on by. */
  hasDependedOnByRelations?: RelationExistsComparator;
  /** [Deprecated]Comparator for filtering projects which this depends on. */
  hasDependsOnRelations?: RelationExistsComparator;
  /** Comparator for filtering projects with relations. */
  hasRelatedRelations?: RelationExistsComparator;
  /** Comparator for filtering projects with violated dependencies. */
  hasViolatedRelations?: RelationExistsComparator;
  /** Comparator for the project health: onTrack, atRisk, offTrack */
  health?: StringComparator;
  /** Comparator for the project health (with age): onTrack, atRisk, offTrack, outdated, noUpdate */
  healthWithAge?: StringComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Filters that the projects initiatives must satisfy. */
  initiatives?: InitiativeCollectionFilter;
  /** Filters that the projects issues must satisfy. */
  issues?: IssueCollectionFilter;
  /** Filters that the last applied template must satisfy. */
  lastAppliedTemplate?: NullableTemplateFilter;
  /** Filters that the projects lead must satisfy. */
  lead?: NullableUserFilter;
  /** Filters that the projects members must satisfy. */
  members?: UserCollectionFilter;
  /** Comparator for the project name. */
  name?: StringComparator;
  /** Filters that the project's customer needs must satisfy. */
  needs?: CustomerNeedCollectionFilter;
  /** Filters that the project's next milestone must satisfy. */
  nextProjectMilestone?: ProjectMilestoneFilter;
  /** Filter based on the existence of the relation. */
  null?: Scalars['Boolean'];
  /** Compound filters, one of which need to be matched by the project. */
  or?: Array<NullableProjectFilter>;
  /** Comparator for the projects priority. */
  priority?: NullableNumberComparator;
  /** Filters that the project's milestones must satisfy. */
  projectMilestones?: ProjectMilestoneCollectionFilter;
  /** Comparator for the project updates. */
  projectUpdates?: ProjectUpdatesCollectionFilter;
  /** Filters that the projects roadmaps must satisfy. */
  roadmaps?: RoadmapCollectionFilter;
  /** [Internal] Comparator for the project's content. */
  searchableContent?: ContentComparator;
  /** Comparator for the project slug ID. */
  slugId?: StringComparator;
  /** Comparator for the project start date. */
  startDate?: NullableDateComparator;
  /** [DEPRECATED] Comparator for the project state. */
  state?: StringComparator;
  /** Filters that the project's status must satisfy. */
  status?: ProjectStatusFilter;
  /** Comparator for the project target date. */
  targetDate?: NullableDateComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type NullableProjectMilestoneFilter = {
  /** Compound filters, all of which need to be matched by the project milestone. */
  and?: Array<NullableProjectMilestoneFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the project milestone name. */
  name?: NullableStringComparator;
  /** Filter based on the existence of the relation. */
  null?: Scalars['Boolean'];
  /** Compound filters, one of which need to be matched by the project milestone. */
  or?: Array<NullableProjectMilestoneFilter>;
  /** Comparator for the project milestone target date. */
  targetDate?: NullableDateComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type ReactionFilter = {
  /** Compound filters, all of which need to be matched by the reaction. */
  and?: Array<ReactionFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Comparator for the reactions custom emoji. */
  customEmojiId?: IdComparator;
  /** Comparator for the reactions emoji. */
  emoji?: StringComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Compound filters, one of which need to be matched by the reaction. */
  or?: Array<ReactionFilter>;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type ReactionCollectionFilter = {
  /** Compound filters, all of which need to be matched by the reaction. */
  and?: Array<ReactionCollectionFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Comparator for the reactions custom emoji. */
  customEmojiId?: IdComparator;
  /** Comparator for the reactions emoji. */
  emoji?: StringComparator;
  /** Filters that needs to be matched by all reactions. */
  every?: ReactionFilter;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the collection length. */
  length?: NumberComparator;
  /** Compound filters, one of which need to be matched by the reaction. */
  or?: Array<ReactionCollectionFilter>;
  /** Filters that needs to be matched by some reactions. */
  some?: ReactionFilter;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export enum SlaStatus {
  Breached = 'Breached',
  Completed = 'Completed',
  Failed = 'Failed',
  HighRisk = 'HighRisk',
  LowRisk = 'LowRisk',
  MediumRisk = 'MediumRisk',
}

export type SlaStatusComparator = {
  /** Equals constraint. */
  eq?: SlaStatus;
  /** In-array constraint. */
  in?: Array<SlaStatus>;
  /** Not-equals constraint. */
  neq?: SlaStatus;
  /** Not-in-array constraint. */
  nin?: Array<SlaStatus>;
  /** Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values. */
  null?: Scalars['Boolean'];
};

export type SubTypeComparator = {
  /** Equals constraint. */
  eq?: Scalars['String'];
  /** In-array constraint. */
  in?: Array<Scalars['String']>;
  /** Not-equals constraint. */
  neq?: Scalars['String'];
  /** Not-in-array constraint. */
  nin?: Array<Scalars['String']>;
  /** Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values. */
  null?: Scalars['Boolean'];
};

export type SourceMetadataComparator = {
  /** Equals constraint. */
  eq?: Scalars['String'];
  /** In-array constraint. */
  in?: Array<Scalars['String']>;
  /** Not-equals constraint. */
  neq?: Scalars['String'];
  /** Not-in-array constraint. */
  nin?: Array<Scalars['String']>;
  /** Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values. */
  null?: Scalars['Boolean'];
  /** Compound filters, all of which need to be matched by the sub type. */
  subType?: SubTypeComparator;
};

export type WorkflowStateFilter = {
  /** Compound filters, all of which need to be matched by the workflow state. */
  and?: Array<WorkflowStateFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Comparator for the workflow state description. */
  description?: StringComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Filters that the workflow states issues must satisfy. */
  issues?: IssueCollectionFilter;
  /** Comparator for the workflow state name. */
  name?: StringComparator;
  /** Compound filters, one of which need to be matched by the workflow state. */
  or?: Array<WorkflowStateFilter>;
  /** Comparator for the workflow state position. */
  position?: NumberComparator;
  /** Filters that the workflow states team must satisfy. */
  team?: TeamFilter;
  /** Comparator for the workflow state type. */
  type?: StringComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type NullableProjectUpdateFilter = {
  /** Compound filters, all of which need to be matched by the project update. */
  and?: Array<NullableProjectUpdateFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Filter based on the existence of the relation. */
  null?: Scalars['Boolean'];
  /** Compound filters, one of which need to be matched by the project update. */
  or?: Array<NullableProjectUpdateFilter>;
  /** Filters that the project update project must satisfy. */
  project?: ProjectFilter;
  /** Filters that the project updates reactions must satisfy. */
  reactions?: ReactionCollectionFilter;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
  /** Filters that the project update creator must satisfy. */
  user?: UserFilter;
};

export type NullableIssueFilter = {
  /** Comparator for the issues added to cycle at date. */
  addedToCycleAt?: NullableDateComparator;
  /** Comparator for the period when issue was added to a cycle. */
  addedToCyclePeriod?: CyclePeriodComparator;
  /** Compound filters, all of which need to be matched by the issue. */
  and?: Array<NullableIssueFilter>;
  /** Comparator for the issues archived at date. */
  archivedAt?: NullableDateComparator;
  /** Filters that the issues assignee must satisfy. */
  assignee?: NullableUserFilter;
  /** Filters that the issues attachments must satisfy. */
  attachments?: AttachmentCollectionFilter;
  /** Comparator for the issues auto archived at date. */
  autoArchivedAt?: NullableDateComparator;
  /** Comparator for the issues auto closed at date. */
  autoClosedAt?: NullableDateComparator;
  /** Comparator for the issues canceled at date. */
  canceledAt?: NullableDateComparator;
  /** Filters that the child issues must satisfy. */
  children?: IssueCollectionFilter;
  /** Filters that the issues comments must satisfy. */
  comments?: CommentCollectionFilter;
  /** Comparator for the issues completed at date. */
  completedAt?: NullableDateComparator;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the issues creator must satisfy. */
  creator?: NullableUserFilter;
  /** Count of customers */
  customerCount?: NumberComparator;
  /** Filters that the issues cycle must satisfy. */
  cycle?: NullableCycleFilter;
  /** Comparator for the issues description. */
  description?: NullableStringComparator;
  /** Comparator for the issues due date. */
  dueDate?: NullableTimelessDateComparator;
  /** Comparator for the issues estimate. */
  estimate?: EstimateComparator;
  /** Comparator for filtering issues which are blocked. */
  hasBlockedByRelations?: RelationExistsComparator;
  /** Comparator for filtering issues which are blocking. */
  hasBlockingRelations?: RelationExistsComparator;
  /** Comparator for filtering issues which are duplicates. */
  hasDuplicateRelations?: RelationExistsComparator;
  /** Comparator for filtering issues with relations. */
  hasRelatedRelations?: RelationExistsComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Filters that issue labels must satisfy. */
  labels?: IssueLabelCollectionFilter;
  /** Filters that the last applied template must satisfy. */
  lastAppliedTemplate?: NullableTemplateFilter;
  /** Filters that the issue's customer needs must satisfy. */
  needs?: CustomerNeedCollectionFilter;
  /** Filter based on the existence of the relation. */
  null?: Scalars['Boolean'];
  /** Comparator for the issues number. */
  number?: NumberComparator;
  /** Compound filters, one of which need to be matched by the issue. */
  or?: Array<NullableIssueFilter>;
  /** Filters that the issue parent must satisfy. */
  parent?: NullableIssueFilter;
  /** Comparator for the issues priority. */
  priority?: NullableNumberComparator;
  /** Filters that the issues project must satisfy. */
  project?: NullableProjectFilter;
  /** Filters that the issues project milestone must satisfy. */
  projectMilestone?: NullableProjectMilestoneFilter;
  /** Filters that the issues reactions must satisfy. */
  reactions?: ReactionCollectionFilter;
  /** [ALPHA] Filters that the recurring issue template must satisfy. */
  recurringIssueTemplate?: NullableTemplateFilter;
  /** [Internal] Comparator for the issues content. */
  searchableContent?: ContentComparator;
  /** Comparator for the issues sla status. */
  slaStatus?: SlaStatusComparator;
  /** Filters that the issues snoozer must satisfy. */
  snoozedBy?: NullableUserFilter;
  /** Comparator for the issues snoozed until date. */
  snoozedUntilAt?: NullableDateComparator;
  /** Filters that the source must satisfy. */
  sourceMetadata?: SourceMetadataComparator;
  /** Comparator for the issues started at date. */
  startedAt?: NullableDateComparator;
  /** Filters that the issues state must satisfy. */
  state?: WorkflowStateFilter;
  /** Filters that issue subscribers must satisfy. */
  subscribers?: UserCollectionFilter;
  /** Filters that the issues team must satisfy. */
  team?: TeamFilter;
  /** Comparator for the issues title. */
  title?: StringComparator;
  /** Comparator for the issues triaged at date. */
  triagedAt?: NullableDateComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};
export type NullableCommentFilter = {
  /** Compound filters, all of which need to be matched by the comment. */
  and?: Array<NullableCommentFilter>;
  /** Comparator for the comment's body. */
  body?: StringComparator;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the comment's document content must satisfy. */
  documentContent?: NullableDocumentContentFilter;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Filters that the comment's issue must satisfy. */
  issue?: NullableIssueFilter;
  /** Filters that the comment's customer needs must satisfy. */
  needs?: CustomerNeedCollectionFilter;
  /** Filter based on the existence of the relation. */
  null?: Scalars['Boolean'];
  /** Compound filters, one of which need to be matched by the comment. */
  or?: Array<NullableCommentFilter>;
  /** Filters that the comment parent must satisfy. */
  parent?: NullableCommentFilter;
  /** Filters that the comment's project update must satisfy. */
  projectUpdate?: NullableProjectUpdateFilter;
  /** Filters that the comment's reactions must satisfy. */
  reactions?: ReactionCollectionFilter;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
  /** Filters that the comment's creator must satisfy. */
  user?: UserFilter;
};

export type StringItemComparator = {
  /** Contains constraint. Matches any values that contain the given string. */
  contains?: Scalars['String'];
  /** Contains case insensitive constraint. Matches any values that contain the given string case insensitive. */
  containsIgnoreCase?: Scalars['String'];
  /** Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive. */
  containsIgnoreCaseAndAccent?: Scalars['String'];
  /** Ends with constraint. Matches any values that end with the given string. */
  endsWith?: Scalars['String'];
  /** Equals constraint. */
  eq?: Scalars['String'];
  /** Equals case insensitive. Matches any values that matches the given string case insensitive. */
  eqIgnoreCase?: Scalars['String'];
  /** In-array constraint. */
  in?: Array<Scalars['String']>;
  /** Not-equals constraint. */
  neq?: Scalars['String'];
  /** Not-equals case insensitive. Matches any values that don't match the given string case insensitive. */
  neqIgnoreCase?: Scalars['String'];
  /** Not-in-array constraint. */
  nin?: Array<Scalars['String']>;
  /** Doesn't contain constraint. Matches any values that don't contain the given string. */
  notContains?: Scalars['String'];
  /** Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive. */
  notContainsIgnoreCase?: Scalars['String'];
  /** Doesn't end with constraint. Matches any values that don't end with the given string. */
  notEndsWith?: Scalars['String'];
  /** Doesn't start with constraint. Matches any values that don't start with the given string. */
  notStartsWith?: Scalars['String'];
  /** Starts with constraint. Matches any values that start with the given string. */
  startsWith?: Scalars['String'];
  /** Starts with case insensitive constraint. Matches any values that start with the given string. */
  startsWithIgnoreCase?: Scalars['String'];
};

export type StringArrayComparator = {
  /** Compound filters, all of which need to be matched. */
  every?: StringItemComparator;
  /** Length of the array. Matches any values that have the given length. */
  length?: NumberComparator;
  /** Compound filters, one of which needs to be matched. */
  some?: StringItemComparator;
};

export type CustomerStatusFilter = {
  /** Compound filters, all of which need to be matched by the customer status. */
  and?: Array<CustomerStatusFilter>;
  /** Comparator for the customer status color. */
  color?: StringComparator;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Comparator for the customer status description. */
  description?: StringComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the customer status name. */
  name?: StringComparator;
  /** Compound filters, one of which needs to be matched by the customer status. */
  or?: Array<CustomerStatusFilter>;
  /** Comparator for the customer status position. */
  position?: NumberComparator;
  /** Comparator for the customer status type. */
  type?: StringComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type CustomerTierFilter = {
  /** Compound filters, all of which need to be matched by the customer tier. */
  and?: Array<CustomerTierFilter>;
  /** Comparator for the customer tier color. */
  color?: StringComparator;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Comparator for the customer tier description. */
  description?: StringComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the customer tier name. */
  name?: StringComparator;
  /** Compound filters, one of which needs to be matched by the customer tier. */
  or?: Array<CustomerTierFilter>;
  /** Comparator for the customer tier position. */
  position?: NumberComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type NullableCustomerFilter = {
  /** Compound filters, all of which need to be matched by the customer. */
  and?: Array<NullableCustomerFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Comparator for the customer's domains. */
  domains?: StringArrayComparator;
  /** Comparator for the customer's external IDs. */
  externalIds?: StringArrayComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the customer name. */
  name?: StringComparator;
  /** Filters that the customer's needs must satisfy. */
  needs?: CustomerNeedCollectionFilter;
  /** Filter based on the existence of the relation. */
  null?: Scalars['Boolean'];
  /** Compound filters, one of which need to be matched by the customer. */
  or?: Array<NullableCustomerFilter>;
  /** Filters that the customer owner must satisfy. */
  owner?: NullableUserFilter;
  /** Comparator for the customer generated revenue. */
  revenue?: NumberComparator;
  /** Comparator for the customer size. */
  size?: NumberComparator;
  /** Comparator for the customer slack channel ID. */
  slackChannelId?: StringComparator;
  /** Filters that the customer's status must satisfy. */
  status?: CustomerStatusFilter;
  /** Filters that the customer's tier must satisfy. */
  tier?: CustomerTierFilter;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type CustomerNeedFilter = {
  /** Compound filters, all of which need to be matched by the customer need. */
  and?: Array<CustomerNeedFilter>;
  /** Filters that the need's comment must satisfy. */
  comment?: NullableCommentFilter;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the need's customer must satisfy. */
  customer?: NullableCustomerFilter;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Filters that the need's issue must satisfy. */
  issue?: NullableIssueFilter;
  /** Compound filters, one of which need to be matched by the customer need. */
  or?: Array<CustomerNeedFilter>;
  /** Comparator for the customer need priority. */
  priority?: NumberComparator;
  /** Filters that the need's project must satisfy. */
  project?: NullableProjectFilter;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type CustomerNeedCollectionFilter = {
  /** Compound filters, all of which need to be matched by the customer needs. */
  and?: Array<CustomerNeedCollectionFilter>;
  /** Filters that the need's comment must satisfy. */
  comment?: NullableCommentFilter;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the need's customer must satisfy. */
  customer?: NullableCustomerFilter;
  /** Filters that needs to be matched by all customer needs. */
  every?: CustomerNeedFilter;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Filters that the need's issue must satisfy. */
  issue?: NullableIssueFilter;
  /** Comparator for the collection length. */
  length?: NumberComparator;
  /** Compound filters, one of which need to be matched by the customer needs. */
  or?: Array<CustomerNeedCollectionFilter>;
  /** Comparator for the customer need priority. */
  priority?: NumberComparator;
  /** Filters that the need's project must satisfy. */
  project?: NullableProjectFilter;
  /** Filters that needs to be matched by some customer needs. */
  some?: CustomerNeedFilter;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type ProjectCollectionFilter = {
  /** Filters that the project's team must satisfy. */
  accessibleTeams?: TeamCollectionFilter;
  /** Compound filters, all of which need to be matched by the project. */
  and?: Array<ProjectCollectionFilter>;
  /** Comparator for the project cancelation date. */
  canceledAt?: NullableDateComparator;
  /** Comparator for the project completion date. */
  completedAt?: NullableDateComparator;
  /** Filters that the project's completed milestones must satisfy. */
  completedProjectMilestones?: ProjectMilestoneCollectionFilter;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the projects creator must satisfy. */
  creator?: UserFilter;
  /** Count of customers */
  customerCount?: NumberComparator;
  /** Filters that needs to be matched by all projects. */
  every?: ProjectFilter;
  /** Comparator for filtering projects which are blocked. */
  hasBlockedByRelations?: RelationExistsComparator;
  /** Comparator for filtering projects which are blocking. */
  hasBlockingRelations?: RelationExistsComparator;
  /** [Deprecated] Comparator for filtering projects which this is depended on by. */
  hasDependedOnByRelations?: RelationExistsComparator;
  /** [Deprecated]Comparator for filtering projects which this depends on. */
  hasDependsOnRelations?: RelationExistsComparator;
  /** Comparator for filtering projects with relations. */
  hasRelatedRelations?: RelationExistsComparator;
  /** Comparator for filtering projects with violated dependencies. */
  hasViolatedRelations?: RelationExistsComparator;
  /** Comparator for the project health: onTrack, atRisk, offTrack */
  health?: StringComparator;
  /** Comparator for the project health (with age): onTrack, atRisk, offTrack, outdated, noUpdate */
  healthWithAge?: StringComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Filters that the projects initiatives must satisfy. */
  initiatives?: InitiativeCollectionFilter;
  /** Filters that the projects issues must satisfy. */
  issues?: IssueCollectionFilter;
  /** Filters that the last applied template must satisfy. */
  lastAppliedTemplate?: NullableTemplateFilter;
  /** Filters that the projects lead must satisfy. */
  lead?: NullableUserFilter;
  /** Comparator for the collection length. */
  length?: NumberComparator;
  /** Filters that the projects members must satisfy. */
  members?: UserCollectionFilter;
  /** Comparator for the project name. */
  name?: StringComparator;
  /** Filters that the project's customer needs must satisfy. */
  needs?: CustomerNeedCollectionFilter;
  /** Filters that the project's next milestone must satisfy. */
  nextProjectMilestone?: ProjectMilestoneFilter;
  /** Compound filters, one of which need to be matched by the project. */
  or?: Array<ProjectCollectionFilter>;
  /** Comparator for the projects priority. */
  priority?: NullableNumberComparator;
  /** Filters that the project's milestones must satisfy. */
  projectMilestones?: ProjectMilestoneCollectionFilter;
  /** Comparator for the project updates. */
  projectUpdates?: ProjectUpdatesCollectionFilter;
  /** Filters that the projects roadmaps must satisfy. */
  roadmaps?: RoadmapCollectionFilter;
  /** [Internal] Comparator for the project's content. */
  searchableContent?: ContentComparator;
  /** Comparator for the project slug ID. */
  slugId?: StringComparator;
  /** Filters that needs to be matched by some projects. */
  some?: ProjectFilter;
  /** Comparator for the project start date. */
  startDate?: NullableDateComparator;
  /** [DEPRECATED] Comparator for the project state. */
  state?: StringComparator;
  /** Filters that the project's status must satisfy. */
  status?: ProjectStatusFilter;
  /** Comparator for the project target date. */
  targetDate?: NullableDateComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type ProjectStatusFilter = {
  /** Compound filters, all of which need to be matched by the project status. */
  and?: Array<ProjectStatusFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Comparator for the project status description. */
  description?: StringComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the project status name. */
  name?: StringComparator;
  /** Compound filters, one of which needs to be matched by the project status. */
  or?: Array<ProjectStatusFilter>;
  /** Comparator for the project status position. */
  position?: NumberComparator;
  /** Filters that the project status projects must satisfy. */
  projects?: ProjectCollectionFilter;
  /** Comparator for the project status type. */
  type?: StringComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};
export type ProjectFilter = {
  /** Filters that the project's team must satisfy. */
  accessibleTeams?: TeamCollectionFilter;
  /** Compound filters, all of which need to be matched by the project. */
  and?: Array<ProjectFilter>;
  /** Comparator for the project cancelation date. */
  canceledAt?: NullableDateComparator;
  /** Comparator for the project completion date. */
  completedAt?: NullableDateComparator;
  /** Filters that the project's completed milestones must satisfy. */
  completedProjectMilestones?: ProjectMilestoneCollectionFilter;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the projects creator must satisfy. */
  creator?: UserFilter;
  /** Count of customers */
  customerCount?: NumberComparator;
  /** Comparator for filtering projects which are blocked. */
  hasBlockedByRelations?: RelationExistsComparator;
  /** Comparator for filtering projects which are blocking. */
  hasBlockingRelations?: RelationExistsComparator;
  /** [Deprecated] Comparator for filtering projects which this is depended on by. */
  hasDependedOnByRelations?: RelationExistsComparator;
  /** [Deprecated]Comparator for filtering projects which this depends on. */
  hasDependsOnRelations?: RelationExistsComparator;
  /** Comparator for filtering projects with relations. */
  hasRelatedRelations?: RelationExistsComparator;
  /** Comparator for filtering projects with violated dependencies. */
  hasViolatedRelations?: RelationExistsComparator;
  /** Comparator for the project health: onTrack, atRisk, offTrack */
  health?: StringComparator;
  /** Comparator for the project health (with age): onTrack, atRisk, offTrack, outdated, noUpdate */
  healthWithAge?: StringComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Filters that the projects initiatives must satisfy. */
  initiatives?: InitiativeCollectionFilter;
  /** Filters that the projects issues must satisfy. */
  issues?: IssueCollectionFilter;
  /** Filters that the last applied template must satisfy. */
  lastAppliedTemplate?: NullableTemplateFilter;
  /** Filters that the projects lead must satisfy. */
  lead?: NullableUserFilter;
  /** Filters that the projects members must satisfy. */
  members?: UserCollectionFilter;
  /** Comparator for the project name. */
  name?: StringComparator;
  /** Filters that the project's customer needs must satisfy. */
  needs?: CustomerNeedCollectionFilter;
  /** Filters that the project's next milestone must satisfy. */
  nextProjectMilestone?: ProjectMilestoneFilter;
  /** Compound filters, one of which need to be matched by the project. */
  or?: Array<ProjectFilter>;
  /** Comparator for the projects priority. */
  priority?: NullableNumberComparator;
  /** Filters that the project's milestones must satisfy. */
  projectMilestones?: ProjectMilestoneCollectionFilter;
  /** Comparator for the project updates. */
  projectUpdates?: ProjectUpdatesCollectionFilter;
  /** Filters that the projects roadmaps must satisfy. */
  roadmaps?: RoadmapCollectionFilter;
  /** [Internal] Comparator for the project's content. */
  searchableContent?: ContentComparator;
  /** Comparator for the project slug ID. */
  slugId?: StringComparator;
  /** Comparator for the project start date. */
  startDate?: NullableDateComparator;
  /** [DEPRECATED] Comparator for the project state. */
  state?: StringComparator;
  /** Filters that the project's status must satisfy. */
  status?: ProjectStatusFilter;
  /** Comparator for the project target date. */
  targetDate?: NullableDateComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type DocumentFilter = {
  /** Compound filters, all of which need to be matched by the document. */
  and?: Array<DocumentFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the document's creator must satisfy. */
  creator?: UserFilter;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Filters that the document's initiative must satisfy. */
  initiative?: InitiativeFilter;
  /** Compound filters, one of which need to be matched by the document. */
  or?: Array<DocumentFilter>;
  /** Filters that the document's project must satisfy. */
  project?: ProjectFilter;
  /** Comparator for the document slug ID. */
  slugId?: StringComparator;
  /** Comparator for the document title. */
  title?: StringComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type NullableDocumentContentFilter = {
  /** Compound filters, all of which need to be matched by the user. */
  and?: Array<NullableDocumentContentFilter>;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the document content document must satisfy. */
  document?: DocumentFilter;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Filter based on the existence of the relation. */
  null?: Scalars['Boolean'];
  /** Compound filters, one of which need to be matched by the user. */
  or?: Array<NullableDocumentContentFilter>;
  /** Filters that the document content project must satisfy. */
  project?: ProjectFilter;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type CommentFilter = {
  /** Compound filters, all of which need to be matched by the comment. */
  and?: Array<CommentFilter>;
  /** Comparator for the comment's body. */
  body?: StringComparator;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the comment's document content must satisfy. */
  documentContent?: NullableDocumentContentFilter;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Filters that the comment's issue must satisfy. */
  issue?: NullableIssueFilter;
  /** Filters that the comment's customer needs must satisfy. */
  needs?: CustomerNeedCollectionFilter;
  /** Compound filters, one of which need to be matched by the comment. */
  or?: Array<CommentFilter>;
  /** Filters that the comment parent must satisfy. */
  parent?: NullableCommentFilter;
  /** Filters that the comment's project update must satisfy. */
  projectUpdate?: NullableProjectUpdateFilter;
  /** Filters that the comment's reactions must satisfy. */
  reactions?: ReactionCollectionFilter;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
  /** Filters that the comment's creator must satisfy. */
  user?: UserFilter;
};

export type CommentCollectionFilter = {
  /** Compound filters, all of which need to be matched by the comment. */
  and?: Array<CommentCollectionFilter>;
  /** Comparator for the comment's body. */
  body?: StringComparator;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the comment's document content must satisfy. */
  documentContent?: NullableDocumentContentFilter;
  /** Filters that needs to be matched by all comments. */
  every?: CommentFilter;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Filters that the comment's issue must satisfy. */
  issue?: NullableIssueFilter;
  /** Comparator for the collection length. */
  length?: NumberComparator;
  /** Filters that the comment's customer needs must satisfy. */
  needs?: CustomerNeedCollectionFilter;
  /** Compound filters, one of which need to be matched by the comment. */
  or?: Array<CommentCollectionFilter>;
  /** Filters that the comment parent must satisfy. */
  parent?: NullableCommentFilter;
  /** Filters that the comment's project update must satisfy. */
  projectUpdate?: NullableProjectUpdateFilter;
  /** Filters that the comment's reactions must satisfy. */
  reactions?: ReactionCollectionFilter;
  /** Filters that needs to be matched by some comments. */
  some?: CommentFilter;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
  /** Filters that the comment's creator must satisfy. */
  user?: UserFilter;
};

export type IssueCollectionFilter = {
  /** Comparator for the issues added to cycle at date. */
  addedToCycleAt?: NullableDateComparator;
  /** Comparator for the period when issue was added to a cycle. */
  addedToCyclePeriod?: CyclePeriodComparator;
  /** Compound filters, all of which need to be matched by the issue. */
  and?: Array<IssueCollectionFilter>;
  /** Comparator for the issues archived at date. */
  archivedAt?: NullableDateComparator;
  /** Filters that the issues assignee must satisfy. */
  assignee?: NullableUserFilter;
  /** Filters that the issues attachments must satisfy. */
  attachments?: AttachmentCollectionFilter;
  /** Comparator for the issues auto archived at date. */
  autoArchivedAt?: NullableDateComparator;
  /** Comparator for the issues auto closed at date. */
  autoClosedAt?: NullableDateComparator;
  /** Comparator for the issues canceled at date. */
  canceledAt?: NullableDateComparator;
  /** Filters that the child issues must satisfy. */
  children?: IssueCollectionFilter;
  /** Filters that the issues comments must satisfy. */
  comments?: CommentCollectionFilter;
  /** Comparator for the issues completed at date. */
  completedAt?: NullableDateComparator;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the issues creator must satisfy. */
  creator?: NullableUserFilter;
  /** Count of customers */
  customerCount?: NumberComparator;
  /** Filters that the issues cycle must satisfy. */
  cycle?: NullableCycleFilter;
  /** Comparator for the issues description. */
  description?: NullableStringComparator;
  /** Comparator for the issues due date. */
  dueDate?: NullableTimelessDateComparator;
  /** Comparator for the issues estimate. */
  estimate?: EstimateComparator;
  /** Filters that needs to be matched by all issues. */
  every?: IssueFilter;
  /** Comparator for filtering issues which are blocked. */
  hasBlockedByRelations?: RelationExistsComparator;
  /** Comparator for filtering issues which are blocking. */
  hasBlockingRelations?: RelationExistsComparator;
  /** Comparator for filtering issues which are duplicates. */
  hasDuplicateRelations?: RelationExistsComparator;
  /** Comparator for filtering issues with relations. */
  hasRelatedRelations?: RelationExistsComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Filters that issue labels must satisfy. */
  labels?: IssueLabelCollectionFilter;
  /** Filters that the last applied template must satisfy. */
  lastAppliedTemplate?: NullableTemplateFilter;
  /** Comparator for the collection length. */
  length?: NumberComparator;
  /** Filters that the issue's customer needs must satisfy. */
  needs?: CustomerNeedCollectionFilter;
  /** Comparator for the issues number. */
  number?: NumberComparator;
  /** Compound filters, one of which need to be matched by the issue. */
  or?: Array<IssueCollectionFilter>;
  /** Filters that the issue parent must satisfy. */
  parent?: NullableIssueFilter;
  /** Comparator for the issues priority. */
  priority?: NullableNumberComparator;
  /** Filters that the issues project must satisfy. */
  project?: NullableProjectFilter;
  /** Filters that the issues project milestone must satisfy. */
  projectMilestone?: NullableProjectMilestoneFilter;
  /** Filters that the issues reactions must satisfy. */
  reactions?: ReactionCollectionFilter;
  /** [ALPHA] Filters that the recurring issue template must satisfy. */
  recurringIssueTemplate?: NullableTemplateFilter;
  /** [Internal] Comparator for the issues content. */
  searchableContent?: ContentComparator;
  /** Comparator for the issues sla status. */
  slaStatus?: SlaStatusComparator;
  /** Filters that the issues snoozer must satisfy. */
  snoozedBy?: NullableUserFilter;
  /** Comparator for the issues snoozed until date. */
  snoozedUntilAt?: NullableDateComparator;
  /** Filters that needs to be matched by some issues. */
  some?: IssueFilter;
  /** Filters that the source must satisfy. */
  sourceMetadata?: SourceMetadataComparator;
  /** Comparator for the issues started at date. */
  startedAt?: NullableDateComparator;
  /** Filters that the issues state must satisfy. */
  state?: WorkflowStateFilter;
  /** Filters that issue subscribers must satisfy. */
  subscribers?: UserCollectionFilter;
  /** Filters that the issues team must satisfy. */
  team?: TeamFilter;
  /** Comparator for the issues title. */
  title?: StringComparator;
  /** Comparator for the issues triaged at date. */
  triagedAt?: NullableDateComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};
export type NullableUserFilter = {
  /** Comparator for the user's activity status. */
  active?: BooleanComparator;
  /** Comparator for the user's admin status. */
  admin?: BooleanComparator;
  /** Compound filters, all of which need to be matched by the user. */
  and?: Array<NullableUserFilter>;
  /** Comparator for the user's app status. */
  app?: BooleanComparator;
  /** Filters that the users assigned issues must satisfy. */
  assignedIssues?: IssueCollectionFilter;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Comparator for the user's display name. */
  displayName?: StringComparator;
  /** Comparator for the user's email. */
  email?: StringComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Comparator for the user's invited status. */
  invited?: BooleanComparator;
  /** Filter based on the currently authenticated user. Set to true to filter for the authenticated user, false for any other user. */
  isMe?: BooleanComparator;
  /** Comparator for the user's name. */
  name?: StringComparator;
  /** Filter based on the existence of the relation. */
  null?: Scalars['Boolean'];
  /** Compound filters, one of which need to be matched by the user. */
  or?: Array<NullableUserFilter>;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type IssueFilter = {
  /** Comparator for the issues added to cycle at date. */
  addedToCycleAt?: NullableDateComparator;
  /** Comparator for the period when issue was added to a cycle. */
  addedToCyclePeriod?: CyclePeriodComparator;
  /** Compound filters, all of which need to be matched by the issue. */
  and?: Array<IssueFilter>;
  /** Comparator for the issues archived at date. */
  archivedAt?: NullableDateComparator;
  /** Filters that the issues assignee must satisfy. */
  assignee?: NullableUserFilter;
  /** Filters that the issues attachments must satisfy. */
  attachments?: AttachmentCollectionFilter;
  /** Comparator for the issues auto archived at date. */
  autoArchivedAt?: NullableDateComparator;
  /** Comparator for the issues auto closed at date. */
  autoClosedAt?: NullableDateComparator;
  /** Comparator for the issues canceled at date. */
  canceledAt?: NullableDateComparator;
  /** Filters that the child issues must satisfy. */
  children?: IssueCollectionFilter;
  /** Filters that the issues comments must satisfy. */
  comments?: CommentCollectionFilter;
  /** Comparator for the issues completed at date. */
  completedAt?: NullableDateComparator;
  /** Comparator for the created at date. */
  createdAt?: DateComparator;
  /** Filters that the issues creator must satisfy. */
  creator?: NullableUserFilter;
  /** Count of customers */
  customerCount?: NumberComparator;
  /** Filters that the issues cycle must satisfy. */
  cycle?: NullableCycleFilter;
  /** Comparator for the issues description. */
  description?: NullableStringComparator;
  /** Comparator for the issues due date. */
  dueDate?: NullableTimelessDateComparator;
  /** Comparator for the issues estimate. */
  estimate?: EstimateComparator;
  /** Comparator for filtering issues which are blocked. */
  hasBlockedByRelations?: RelationExistsComparator;
  /** Comparator for filtering issues which are blocking. */
  hasBlockingRelations?: RelationExistsComparator;
  /** Comparator for filtering issues which are duplicates. */
  hasDuplicateRelations?: RelationExistsComparator;
  /** Comparator for filtering issues with relations. */
  hasRelatedRelations?: RelationExistsComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Filters that issue labels must satisfy. */
  labels?: IssueLabelCollectionFilter;
  /** Filters that the last applied template must satisfy. */
  lastAppliedTemplate?: NullableTemplateFilter;
  /** Filters that the issue's customer needs must satisfy. */
  needs?: CustomerNeedCollectionFilter;
  /** Comparator for the issues number. */
  number?: NumberComparator;
  /** Compound filters, one of which need to be matched by the issue. */
  or?: Array<IssueFilter>;
  /** Filters that the issue parent must satisfy. */
  parent?: NullableIssueFilter;
  /** Comparator for the issues priority. */
  priority?: NullableNumberComparator;
  /** Filters that the issues project must satisfy. */
  project?: NullableProjectFilter;
  /** Filters that the issues project milestone must satisfy. */
  projectMilestone?: NullableProjectMilestoneFilter;
  /** Filters that the issues reactions must satisfy. */
  reactions?: ReactionCollectionFilter;
  /** [ALPHA] Filters that the recurring issue template must satisfy. */
  recurringIssueTemplate?: NullableTemplateFilter;
  /** [Internal] Comparator for the issues content. */
  searchableContent?: ContentComparator;
  /** Comparator for the issues sla status. */
  slaStatus?: SlaStatusComparator;
  /** Filters that the issues snoozer must satisfy. */
  snoozedBy?: NullableUserFilter;
  /** Comparator for the issues snoozed until date. */
  snoozedUntilAt?: NullableDateComparator;
  /** Filters that the source must satisfy. */
  sourceMetadata?: SourceMetadataComparator;
  /** Comparator for the issues started at date. */
  startedAt?: NullableDateComparator;
  /** Filters that the issues state must satisfy. */
  state?: WorkflowStateFilter;
  /** Filters that issue subscribers must satisfy. */
  subscribers?: UserCollectionFilter;
  /** Filters that the issues team must satisfy. */
  team?: TeamFilter;
  /** Comparator for the issues title. */
  title?: StringComparator;
  /** Comparator for the issues triaged at date. */
  triagedAt?: NullableDateComparator;
  /** Comparator for the updated at date. */
  updatedAt?: DateComparator;
};

export type LinearIssueFilter = IssueFilter;

export enum SLADayCountType {
  All = 'all',
  OnlyBusinessDays = 'onlyBusinessDays',
}

export type IssueCreateInput = {
  /** The identifier of the user to assign the issue to. */
  assigneeId?: Scalars['String'];
  /** The date when the issue was completed (e.g. if importing from another system). Must be a date in the past and after createdAt date. Cannot be provided with an incompatible workflow state. */
  completedAt?: Scalars['DateTime'];
  /** Create issue as a user with the provided name. This option is only available to OAuth applications creating issues in `actor=application` mode. */
  createAsUser?: Scalars['String'];
  /** The date when the issue was created (e.g. if importing from another system). Must be a date in the past. If none is provided, the backend will generate the time as now. */
  createdAt?: Scalars['DateTime'];
  /** The cycle associated with the issue. */
  cycleId?: Scalars['String'];
  /** The issue description in markdown format. */
  description?: Scalars['String'];
  /** [Internal] The issue description as a Prosemirror document. */
  descriptionData?: Scalars['JSON'];
  /** Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=application` mode. */
  displayIconUrl?: Scalars['String'];
  /** The date at which the issue is due. */
  dueDate?: Scalars['TimelessDate'];
  /** The estimated complexity of the issue. */
  estimate?: Scalars['Int'];
  /** The identifier in UUID v4 format. If none is provided, the backend will generate one. */
  id?: Scalars['String'];
  /** The identifiers of the issue labels associated with this ticket. */
  labelIds?: Array<Scalars['String']>;
  /** The ID of the last template applied to the issue. */
  lastAppliedTemplateId?: Scalars['String'];
  /** The identifier of the parent issue. */
  parentId?: Scalars['String'];
  /** Whether the passed sort order should be preserved. */
  preserveSortOrderOnCreate?: Scalars['Boolean'];
  /** The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low. */
  priority?: Scalars['Int'];
  /** The position of the issue related to other issues, when ordered by priority. */
  prioritySortOrder?: Scalars['Float'];
  /** The project associated with the issue. */
  projectId?: Scalars['String'];
  /** The project milestone associated with the issue. */
  projectMilestoneId?: Scalars['String'];
  /** The comment the issue is referencing. */
  referenceCommentId?: Scalars['String'];
  /** [Internal] The timestamp at which an issue will be considered in breach of SLA. */
  slaBreachesAt?: Scalars['DateTime'];
  /** The SLA day count type for the issue. Whether SLA should be business days only or calendar days (default). */
  slaType?: SLADayCountType;
  /** The position of the issue related to other issues. */
  sortOrder?: Scalars['Float'];
  /** The comment the issue is created from. */
  sourceCommentId?: Scalars['String'];
  /** [Internal] The pull request comment the issue is created from. */
  sourcePullRequestCommentId?: Scalars['String'];
  /** The team state of the issue. */
  stateId?: Scalars['String'];
  /** The position of the issue in parent's sub-issue list. */
  subIssueSortOrder?: Scalars['Float'];
  /** The identifiers of the users subscribing to this ticket. */
  subscriberIds?: Array<Scalars['String']>;
  /** The identifier of the team associated with the issue. */
  teamId: Scalars['String'];
  /** The identifier of a template the issue should be created from. If other values are provided in the input, they will override template values. */
  templateId?: Scalars['String'];
  /** The title of the issue. */
  title?: Scalars['String'];
};

export type IssueUpdateInput = {
  /** The identifiers of the issue labels to be added to this issue. */
  addedLabelIds?: Array<Scalars['String']>;
  /** The identifier of the user to assign the issue to. */
  assigneeId?: Scalars['String'];
  /** Whether the issue was automatically closed because its parent issue was closed. */
  autoClosedByParentClosing?: Scalars['Boolean'];
  /** The cycle associated with the issue. */
  cycleId?: Scalars['String'];
  /** The issue description in markdown format. */
  description?: Scalars['String'];
  /** [Internal] The issue description as a Prosemirror document. */
  descriptionData?: Scalars['JSON'];
  /** The date at which the issue is due. */
  dueDate?: Scalars['TimelessDate'];
  /** The estimated complexity of the issue. */
  estimate?: Scalars['Int'];
  /** The identifiers of the issue labels associated with this ticket. */
  labelIds?: Array<Scalars['String']>;
  /** The ID of the last template applied to the issue. */
  lastAppliedTemplateId?: Scalars['String'];
  /** The identifier of the parent issue. */
  parentId?: Scalars['String'];
  /** The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low. */
  priority?: Scalars['Int'];
  /** The position of the issue related to other issues, when ordered by priority. */
  prioritySortOrder?: Scalars['Float'];
  /** The project associated with the issue. */
  projectId?: Scalars['String'];
  /** The project milestone associated with the issue. */
  projectMilestoneId?: Scalars['String'];
  /** The identifiers of the issue labels to be removed from this issue. */
  removedLabelIds?: Array<Scalars['String']>;
  /** [Internal] The timestamp at which an issue will be considered in breach of SLA. */
  slaBreachesAt?: Scalars['DateTime'];
  /** The SLA day count type for the issue. Whether SLA should be business days only or calendar days (default). */
  slaType?: SLADayCountType;
  /** The identifier of the user who snoozed the issue. */
  snoozedById?: Scalars['String'];
  /** The time until an issue will be snoozed in Triage view. */
  snoozedUntilAt?: Scalars['DateTime'];
  /** The position of the issue related to other issues. */
  sortOrder?: Scalars['Float'];
  /** The team state of the issue. */
  stateId?: Scalars['String'];
  /** The position of the issue in parent's sub-issue list. */
  subIssueSortOrder?: Scalars['Float'];
  /** The identifiers of the users subscribing to this ticket. */
  subscriberIds?: Array<Scalars['String']>;
  /** The identifier of the team associated with the issue. */
  teamId?: Scalars['String'];
  /** The issue title. */
  title?: Scalars['String'];
  /** Whether the issue has been trashed. */
  trashed?: Scalars['Boolean'];
};

export type IssueBatchCreateInput = {
  /** The issues to create. */
  issues: Array<IssueCreateInput>;
};
