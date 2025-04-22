/* eslint-disable @typescript-eslint/no-explicit-any */

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
  DateTimeOrDuration: Date | string;
  JSON: Record<string, unknown>;
  JSONObject: any;
  TimelessDate: any;
  TimelessDateOrDuration: any;
  UUID: any;
};

/** Comparator for optional dates. */
export type NullableDateComparator = {
  eq?: Scalars['DateTimeOrDuration'];
  gt?: Scalars['DateTimeOrDuration'];
  gte?: Scalars['DateTimeOrDuration'];
  in?: Array<Scalars['DateTimeOrDuration']>;
  lt?: Scalars['DateTimeOrDuration'];
  lte?: Scalars['DateTimeOrDuration'];
  neq?: Scalars['DateTimeOrDuration'];
  nin?: Array<Scalars['DateTimeOrDuration']>;
  null?: Scalars['Boolean'];
};

export enum CyclePeriod {
  After = 'after',
  Before = 'before',
  During = 'during',
}

export type CyclePeriodComparator = {
  eq?: CyclePeriod;
  in?: Array<CyclePeriod>;
  neq?: CyclePeriod;
  nin?: Array<CyclePeriod>;
  null?: Scalars['Boolean'];
};

export type BooleanComparator = {
  eq?: Scalars['Boolean'];
  neq?: Scalars['Boolean'];
};

export type DateComparator = {
  eq?: Scalars['DateTimeOrDuration'];
  gt?: Scalars['DateTimeOrDuration'];
  gte?: Scalars['DateTimeOrDuration'];
  in?: Array<Scalars['DateTimeOrDuration']>;
  lt?: Scalars['DateTimeOrDuration'];
  lte?: Scalars['DateTimeOrDuration'];
  neq?: Scalars['DateTimeOrDuration'];
  nin?: Array<Scalars['DateTimeOrDuration']>;
};

export type IdComparator = {
  eq?: Scalars['ID'];
  in?: Array<Scalars['ID']>;
  neq?: Scalars['ID'];
  nin?: Array<Scalars['ID']>;
};

export type SourceTypeComparator = {
  contains?: Scalars['String'];
  containsIgnoreCase?: Scalars['String'];
  eq?: Scalars['String'];
  in?: Array<Scalars['String']>;
  neq?: Scalars['String'];
  nin?: Array<Scalars['String']>;
};

export type AttachmentFilter = {
  and?: Array<AttachmentFilter>;
  creator?: NullableUserFilter;
  id?: IdComparator;
  or?: Array<AttachmentFilter>;
  sourceType?: SourceTypeComparator;
  title?: StringComparator;
  url?: StringComparator;
};

export type NumberComparator = {
  eq?: Scalars['Float'];
  gt?: Scalars['Float'];
  gte?: Scalars['Float'];
  in?: Array<Scalars['Float']>;
  lt?: Scalars['Float'];
  lte?: Scalars['Float'];
  neq?: Scalars['Float'];
  nin?: Array<Scalars['Float']>;
};

export type NullableStringComparator = {
  contains?: Scalars['String'];
  containsIgnoreCase?: Scalars['String'];
  eq?: Scalars['String'];
  in?: Array<Scalars['String']>;
  neq?: Scalars['String'];
  nin?: Array<Scalars['String']>;
  null?: Scalars['Boolean'];
  startsWith?: Scalars['String'];
};

export type StringComparator = {
  contains?: Scalars['String'];
  containsIgnoreCase?: Scalars['String'];
  eq?: Scalars['String'];
  in?: Array<Scalars['String']>;
  neq?: Scalars['String'];
  nin?: Array<Scalars['String']>;
  startsWith?: Scalars['String'];
};

export type AttachmentCollectionFilter = {
  and?: Array<AttachmentCollectionFilter>;
  creator?: NullableUserFilter;
  every?: AttachmentFilter;
  id?: IdComparator;
  length?: NumberComparator;
  or?: Array<AttachmentCollectionFilter>;
  some?: AttachmentFilter;
  title?: StringComparator;
};

export type UserFilter = {
  active?: BooleanComparator;
  admin?: BooleanComparator;
  and?: Array<UserFilter>;
  assignedIssues?: IssueCollectionFilter;
  displayName?: StringComparator;
  email?: StringComparator;
  id?: IdComparator;
  isMe?: BooleanComparator;
  name?: StringComparator;
  or?: Array<UserFilter>;
};

export type InitiativeFilter = {
  and?: Array<InitiativeFilter>;
  creator?: UserFilter;
  health?: StringComparator;
  id?: IdComparator;
  name?: StringComparator;
  or?: Array<InitiativeFilter>;
  slugId?: StringComparator;
  status?: StringComparator;
};

export type NullableTeamFilter = {
  and?: Array<NullableTeamFilter>;
  description?: NullableStringComparator;
  id?: IdComparator;
  issues?: IssueCollectionFilter;
  key?: StringComparator;
  name?: StringComparator;
  null?: Scalars['Boolean'];
  or?: Array<NullableTeamFilter>;
  parent?: NullableTeamFilter;
};

export type TeamFilter = {
  and?: Array<TeamFilter>;
  description?: NullableStringComparator;
  id?: IdComparator;
  issues?: IssueCollectionFilter;
  key?: StringComparator;
  name?: StringComparator;
  or?: Array<TeamFilter>;
  parent?: NullableTeamFilter;
};

export type TeamCollectionFilter = {
  and?: Array<TeamCollectionFilter>;
  every?: TeamFilter;
  id?: IdComparator;
  length?: NumberComparator;
  or?: Array<TeamCollectionFilter>;
  some?: TeamFilter;
};

export type ProjectMilestoneCollectionFilter = {
  and?: Array<ProjectMilestoneCollectionFilter>;
  every?: ProjectMilestoneFilter;
  id?: IdComparator;
  length?: NumberComparator;
  name?: NullableStringComparator;
  or?: Array<ProjectMilestoneCollectionFilter>;
  some?: ProjectMilestoneFilter;
  targetDate?: NullableDateComparator;
};

export type ProjectMilestoneFilter = {
  and?: Array<ProjectMilestoneFilter>;
  id?: IdComparator;
  name?: NullableStringComparator;
  or?: Array<ProjectMilestoneFilter>;
  targetDate?: NullableDateComparator;
};

export type RelationExistsComparator = {
  eq?: Scalars['Boolean'];
  neq?: Scalars['Boolean'];
};

export type InitiativeCollectionFilter = {
  and?: Array<InitiativeCollectionFilter>;
  creator?: UserFilter;
  every?: InitiativeFilter;
  health?: StringComparator;
  id?: IdComparator;
  length?: NumberComparator;
  name?: StringComparator;
  or?: Array<InitiativeCollectionFilter>;
  some?: InitiativeFilter;
  status?: StringComparator;
};

export type NullableTemplateFilter = {
  and?: Array<NullableTemplateFilter>;
  id?: IdComparator;
  name?: StringComparator;
  null?: Scalars['Boolean'];
  or?: Array<NullableTemplateFilter>;
  type?: StringComparator;
};

export type UserCollectionFilter = {
  active?: BooleanComparator;
  admin?: BooleanComparator;
  and?: Array<UserCollectionFilter>;
  assignedIssues?: IssueCollectionFilter;
  displayName?: StringComparator;
  email?: StringComparator;
  every?: UserFilter;
  id?: IdComparator;
  isMe?: BooleanComparator;
  length?: NumberComparator;
  name?: StringComparator;
  or?: Array<UserCollectionFilter>;
  some?: UserFilter;
};

export type NullableNumberComparator = {
  eq?: Scalars['Float'];
  gt?: Scalars['Float'];
  gte?: Scalars['Float'];
  in?: Array<Scalars['Float']>;
  lt?: Scalars['Float'];
  lte?: Scalars['Float'];
  neq?: Scalars['Float'];
  nin?: Array<Scalars['Float']>;
  null?: Scalars['Boolean'];
};

export type NullableCycleFilter = {
  and?: Array<NullableCycleFilter>;
  endsAt?: DateComparator;
  id?: IdComparator;
  isActive?: BooleanComparator;
  issues?: IssueCollectionFilter;
  name?: StringComparator;
  null?: Scalars['Boolean'];
  number?: NumberComparator;
  or?: Array<NullableCycleFilter>;
  startsAt?: DateComparator;
  team?: TeamFilter;
};

export type NullableTimelessDateComparator = {
  eq?: Scalars['TimelessDateOrDuration'];
  gt?: Scalars['TimelessDateOrDuration'];
  gte?: Scalars['TimelessDateOrDuration'];
  in?: Array<Scalars['TimelessDateOrDuration']>;
  lt?: Scalars['TimelessDateOrDuration'];
  lte?: Scalars['TimelessDateOrDuration'];
  neq?: Scalars['TimelessDateOrDuration'];
  nin?: Array<Scalars['TimelessDateOrDuration']>;
  null?: Scalars['Boolean'];
};

export type EstimateComparator = {
  and?: Array<NullableNumberComparator>;
  eq?: Scalars['Float'];
  gt?: Scalars['Float'];
  gte?: Scalars['Float'];
  in?: Array<Scalars['Float']>;
  lt?: Scalars['Float'];
  lte?: Scalars['Float'];
  neq?: Scalars['Float'];
  nin?: Array<Scalars['Float']>;
  null?: Scalars['Boolean'];
  or?: Array<NullableNumberComparator>;
};

export type IssueLabelFilter = {
  and?: Array<IssueLabelFilter>;
  creator?: NullableUserFilter;
  id?: IdComparator;
  name?: StringComparator;
  or?: Array<IssueLabelFilter>;
  parent?: IssueLabelFilter;
  team?: NullableTeamFilter;
};

export type IssueLabelCollectionFilter = {
  and?: Array<IssueLabelCollectionFilter>;
  creator?: NullableUserFilter;
  every?: IssueLabelFilter;
  id?: IdComparator;
  length?: NumberComparator;
  name?: StringComparator;
  or?: Array<IssueLabelCollectionFilter>;
  parent?: IssueLabelFilter;
  some?: IssueLabelFilter;
  team?: NullableTeamFilter;
};

export type ProjectUpdatesFilter = {
  and?: Array<ProjectUpdatesFilter>;
  health?: StringComparator;
  id?: IdComparator;
  or?: Array<ProjectUpdatesFilter>;
};

export type ProjectUpdatesCollectionFilter = {
  and?: Array<ProjectUpdatesCollectionFilter>;
  every?: ProjectUpdatesFilter;
  health?: StringComparator;
  id?: IdComparator;
  length?: NumberComparator;
  or?: Array<ProjectUpdatesCollectionFilter>;
  some?: ProjectUpdatesFilter;
};

export type RoadmapFilter = {
  and?: Array<RoadmapFilter>;
  creator?: UserFilter;
  id?: IdComparator;
  name?: StringComparator;
  or?: Array<RoadmapFilter>;
  slugId?: StringComparator;
};

export type RoadmapCollectionFilter = {
  and?: Array<RoadmapCollectionFilter>;
  creator?: UserFilter;
  every?: RoadmapFilter;
  id?: IdComparator;
  length?: NumberComparator;
  name?: StringComparator;
  or?: Array<RoadmapCollectionFilter>;
  some?: RoadmapFilter;
};

export type ContentComparator = {
  contains?: Scalars['String'];
  notContains?: Scalars['String'];
};

export type NullableProjectFilter = {
  accessibleTeams?: TeamCollectionFilter;
  and?: Array<NullableProjectFilter>;
  completedAt?: NullableDateComparator;
  creator?: UserFilter;
  customerCount?: NumberComparator;
  hasBlockedByRelations?: RelationExistsComparator;
  hasBlockingRelations?: RelationExistsComparator;
  health?: StringComparator;
  id?: IdComparator;
  initiatives?: InitiativeCollectionFilter;
  issues?: IssueCollectionFilter;
  lead?: NullableUserFilter;
  members?: UserCollectionFilter;
  name?: StringComparator;
  needs?: CustomerNeedCollectionFilter;
  null?: Scalars['Boolean'];
  or?: Array<NullableProjectFilter>;
  priority?: NullableNumberComparator;
  projectMilestones?: ProjectMilestoneCollectionFilter;
  slugId?: StringComparator;
  startDate?: NullableDateComparator;
  status?: ProjectStatusFilter;
  targetDate?: NullableDateComparator;
};

export type NullableProjectMilestoneFilter = {
  and?: Array<NullableProjectMilestoneFilter>;
  id?: IdComparator;
  name?: NullableStringComparator;
  null?: Scalars['Boolean'];
  or?: Array<NullableProjectMilestoneFilter>;
  targetDate?: NullableDateComparator;
};

export type ReactionFilter = {
  and?: Array<ReactionFilter>;
  emoji?: StringComparator;
  id?: IdComparator;
  or?: Array<ReactionFilter>;
};

export type ReactionCollectionFilter = {
  and?: Array<ReactionCollectionFilter>;
  emoji?: StringComparator;
  every?: ReactionFilter;
  id?: IdComparator;
  length?: NumberComparator;
  or?: Array<ReactionCollectionFilter>;
  some?: ReactionFilter;
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
  eq?: SlaStatus;
  in?: Array<SlaStatus>;
  neq?: SlaStatus;
  nin?: Array<SlaStatus>;
  null?: Scalars['Boolean'];
};

export type SubTypeComparator = {
  eq?: Scalars['String'];
  in?: Array<Scalars['String']>;
  neq?: Scalars['String'];
  nin?: Array<Scalars['String']>;
  null?: Scalars['Boolean'];
};

export type SourceMetadataComparator = {
  eq?: Scalars['String'];
  in?: Array<Scalars['String']>;
  neq?: Scalars['String'];
  nin?: Array<Scalars['String']>;
  null?: Scalars['Boolean'];
  subType?: SubTypeComparator;
};

export type WorkflowStateFilter = {
  and?: Array<WorkflowStateFilter>;
  description?: StringComparator;
  id?: IdComparator;
  issues?: IssueCollectionFilter;
  name?: StringComparator;
  or?: Array<WorkflowStateFilter>;
  position?: NumberComparator;
  team?: TeamFilter;
  type?: StringComparator;
};

export type NullableProjectUpdateFilter = {
  and?: Array<NullableProjectUpdateFilter>;
  id?: IdComparator;
  null?: Scalars['Boolean'];
  or?: Array<NullableProjectUpdateFilter>;
  project?: ProjectFilter;
  reactions?: ReactionCollectionFilter;
  user?: UserFilter;
};

export type NullableIssueFilter = {
  and?: Array<NullableIssueFilter>;
  assignee?: NullableUserFilter;
  attachments?: AttachmentCollectionFilter;
  children?: IssueCollectionFilter;
  comments?: CommentCollectionFilter;
  completedAt?: NullableDateComparator;
  creator?: NullableUserFilter;
  cycle?: NullableCycleFilter;
  description?: NullableStringComparator;
  dueDate?: NullableTimelessDateComparator;
  estimate?: EstimateComparator;
  id?: IdComparator;
  labels?: IssueLabelCollectionFilter;
  null?: Scalars['Boolean'];
  number?: NumberComparator;
  or?: Array<NullableIssueFilter>;
  parent?: NullableIssueFilter;
  priority?: NullableNumberComparator;
  project?: NullableProjectFilter;
  reactions?: ReactionCollectionFilter;
  slaStatus?: SlaStatusComparator;
  state?: WorkflowStateFilter;
  subscribers?: UserCollectionFilter;
  team?: TeamFilter;
  title?: StringComparator;
};

export type NullableCommentFilter = {
  and?: Array<NullableCommentFilter>;
  body?: StringComparator;
  id?: IdComparator;
  issue?: NullableIssueFilter;
  needs?: CustomerNeedCollectionFilter;
  null?: Scalars['Boolean'];
  or?: Array<NullableCommentFilter>;
  parent?: NullableCommentFilter;
  projectUpdate?: NullableProjectUpdateFilter;
  reactions?: ReactionCollectionFilter;
  user?: UserFilter;
};

export type StringItemComparator = {
  contains?: Scalars['String'];
  eq?: Scalars['String'];
  in?: Array<Scalars['String']>;
  neq?: Scalars['String'];
  nin?: Array<Scalars['String']>;
  startsWith?: Scalars['String'];
};

export type StringArrayComparator = {
  every?: StringItemComparator;
  length?: NumberComparator;
  some?: StringItemComparator;
};

export type CustomerStatusFilter = {
  and?: Array<CustomerStatusFilter>;
  color?: StringComparator;
  description?: StringComparator;
  id?: IdComparator;
  name?: StringComparator;
  or?: Array<CustomerStatusFilter>;
  position?: NumberComparator;
  type?: StringComparator;
};

export type CustomerTierFilter = {
  and?: Array<CustomerTierFilter>;
  color?: StringComparator;
  description?: StringComparator;
  id?: IdComparator;
  name?: StringComparator;
  or?: Array<CustomerTierFilter>;
  position?: NumberComparator;
};

export type NullableCustomerFilter = {
  and?: Array<NullableCustomerFilter>;
  domains?: StringArrayComparator;
  id?: IdComparator;
  name?: StringComparator;
  needs?: CustomerNeedCollectionFilter;
  null?: Scalars['Boolean'];
  or?: Array<NullableCustomerFilter>;
  owner?: NullableUserFilter;
  revenue?: NumberComparator;
  status?: CustomerStatusFilter;
  tier?: CustomerTierFilter;
};

export type CustomerNeedFilter = {
  and?: Array<CustomerNeedFilter>;
  comment?: NullableCommentFilter;
  customer?: NullableCustomerFilter;
  id?: IdComparator;
  issue?: NullableIssueFilter;
  or?: Array<CustomerNeedFilter>;
  priority?: NumberComparator;
  project?: NullableProjectFilter;
};

export type CustomerNeedCollectionFilter = {
  and?: Array<CustomerNeedCollectionFilter>;
  comment?: NullableCommentFilter;
  customer?: NullableCustomerFilter;
  every?: CustomerNeedFilter;
  id?: IdComparator;
  issue?: NullableIssueFilter;
  length?: NumberComparator;
  or?: Array<CustomerNeedCollectionFilter>;
  priority?: NumberComparator;
  project?: NullableProjectFilter;
  some?: CustomerNeedFilter;
};

export type ProjectCollectionFilter = {
  accessibleTeams?: TeamCollectionFilter;
  and?: Array<ProjectCollectionFilter>;
  completedAt?: NullableDateComparator;
  creator?: UserFilter;
  customerCount?: NumberComparator;
  every?: ProjectFilter;
  health?: StringComparator;
  id?: IdComparator;
  issues?: IssueCollectionFilter;
  lead?: NullableUserFilter;
  length?: NumberComparator;
  members?: UserCollectionFilter;
  name?: StringComparator;
  needs?: CustomerNeedCollectionFilter;
  or?: Array<ProjectCollectionFilter>;
  priority?: NullableNumberComparator;
  some?: ProjectFilter;
  startDate?: NullableDateComparator;
  status?: ProjectStatusFilter;
  targetDate?: NullableDateComparator;
};

export type ProjectStatusFilter = {
  and?: Array<ProjectStatusFilter>;
  description?: StringComparator;
  id?: IdComparator;
  name?: StringComparator;
  or?: Array<ProjectStatusFilter>;
  position?: NumberComparator;
  projects?: ProjectCollectionFilter;
  type?: StringComparator;
};

export type ProjectFilter = {
  accessibleTeams?: TeamCollectionFilter;
  and?: Array<ProjectFilter>;
  completedAt?: NullableDateComparator;
  creator?: UserFilter;
  health?: StringComparator;
  id?: IdComparator;
  issues?: IssueCollectionFilter;
  lead?: NullableUserFilter;
  members?: UserCollectionFilter;
  name?: StringComparator;
  or?: Array<ProjectFilter>;
  priority?: NullableNumberComparator;
  startDate?: NullableDateComparator;
  status?: ProjectStatusFilter;
  targetDate?: NullableDateComparator;
};

export type DocumentFilter = {
  and?: Array<DocumentFilter>;
  creator?: UserFilter;
  id?: IdComparator;
  initiative?: InitiativeFilter;
  or?: Array<DocumentFilter>;
  project?: ProjectFilter;
  title?: StringComparator;
};

export type NullableDocumentContentFilter = {
  and?: Array<NullableDocumentContentFilter>;
  document?: DocumentFilter;
  id?: IdComparator;
  null?: Scalars['Boolean'];
  or?: Array<NullableDocumentContentFilter>;
  project?: ProjectFilter;
};

export type CommentFilter = {
  and?: Array<CommentFilter>;
  body?: StringComparator;
  id?: IdComparator;
  issue?: NullableIssueFilter;
  needs?: CustomerNeedCollectionFilter;
  or?: Array<CommentFilter>;
  parent?: NullableCommentFilter;
  projectUpdate?: NullableProjectUpdateFilter;
  reactions?: ReactionCollectionFilter;
  user?: UserFilter;
};

export type CommentCollectionFilter = {
  and?: Array<CommentCollectionFilter>;
  body?: StringComparator;
  documentContent?: NullableDocumentContentFilter;
  every?: CommentFilter;
  id?: IdComparator;
  issue?: NullableIssueFilter;
  length?: NumberComparator;
  needs?: CustomerNeedCollectionFilter;
  or?: Array<CommentCollectionFilter>;
  parent?: NullableCommentFilter;
  projectUpdate?: NullableProjectUpdateFilter;
  reactions?: ReactionCollectionFilter;
  some?: CommentFilter;
  user?: UserFilter;
};

export type IssueCollectionFilter = {
  and?: Array<IssueCollectionFilter>;
  assignee?: NullableUserFilter;
  attachments?: AttachmentCollectionFilter;
  children?: IssueCollectionFilter;
  comments?: CommentCollectionFilter;
  completedAt?: NullableDateComparator;
  creator?: NullableUserFilter;
  cycle?: NullableCycleFilter;
  description?: NullableStringComparator;
  dueDate?: NullableTimelessDateComparator;
  estimate?: EstimateComparator;
  every?: IssueFilter;
  id?: IdComparator;
  labels?: IssueLabelCollectionFilter;
  length?: NumberComparator;
  number?: NumberComparator;
  or?: Array<IssueCollectionFilter>;
  parent?: NullableIssueFilter;
  priority?: NullableNumberComparator;
  project?: NullableProjectFilter;
  some?: IssueFilter;
  state?: WorkflowStateFilter;
  subscribers?: UserCollectionFilter;
  team?: TeamFilter;
  title?: StringComparator;
};

export type NullableUserFilter = {
  active?: BooleanComparator;
  and?: Array<NullableUserFilter>;
  assignedIssues?: IssueCollectionFilter;
  displayName?: StringComparator;
  email?: StringComparator;
  id?: IdComparator;
  isMe?: BooleanComparator;
  name?: StringComparator;
  null?: Scalars['Boolean'];
  or?: Array<NullableUserFilter>;
};

export type IssueFilter = {
  /** Compound filters, all of which need to be matched by the issue. */
  and?: Array<IssueFilter>;
  /** Filters that the issues assignee must satisfy. */
  assignee?: NullableUserFilter;
  /** Filters that the child issues must satisfy. */
  children?: IssueCollectionFilter;
  /** Filters that the issues comments must satisfy. */
  comments?: CommentCollectionFilter;
  /** Comparator for the issues description. */
  description?: NullableStringComparator;
  /** Comparator for the identifier. */
  id?: IdComparator;
  /** Filters that issue labels must satisfy. */
  labels?: IssueLabelCollectionFilter;
  /** Compound filters, one of which need to be matched by the issue. */
  or?: Array<IssueFilter>;
  /** Filters that the issue parent must satisfy. */
  parent?: NullableIssueFilter;
  /** Filters that the issues project must satisfy. */
  project?: NullableProjectFilter;
  /** Filters that the issues team must satisfy. */
  team?: TeamFilter;
  /** Comparator for the issues title. */
  title?: StringComparator;
};

export enum SLADayCountType {
  All = 'all',
  OnlyBusinessDays = 'onlyBusinessDays',
}

export type IssueCreateInput = {
  assigneeId?: Scalars['String'];
  completedAt?: Scalars['DateTime'];
  description?: Scalars['String'];
  dueDate?: Scalars['TimelessDate'];
  estimate?: Scalars['Int'];
  id?: Scalars['String'];
  labelIds?: Array<Scalars['String']>;
  parentId?: Scalars['String'];
  priority?: Scalars['Int'];
  projectId?: Scalars['String'];
  stateId?: Scalars['String'];
  subscriberIds?: Array<Scalars['String']>;
  teamId: Scalars['String'];
  title?: Scalars['String'];
};

export type IssueUpdateInput = {
  assigneeId?: Scalars['String'];
  description?: Scalars['String'];
  dueDate?: Scalars['TimelessDate'];
  estimate?: Scalars['Int'];
  labelIds?: Array<Scalars['String']>;
  parentId?: Scalars['String'];
  priority?: Scalars['Int'];
  projectId?: Scalars['String'];
  stateId?: Scalars['String'];
  subscriberIds?: Array<Scalars['String']>;
  teamId?: Scalars['String'];
  title?: Scalars['String'];
};

export type IssueBatchCreateInput = {
  issues: Array<IssueCreateInput>;
};

export type CommentCreateInput = {
  body?: Scalars['String'];
  id?: Scalars['String'];
  issueId?: Scalars['String'];
  parentId?: Scalars['String'];
};

export type ProjectCreateInput = {
  description?: Scalars['String'];
  id?: Scalars['String'];
  leadId?: Scalars['String'];
  memberIds?: Array<Scalars['String']>;
  name: Scalars['String'];
  priority?: Scalars['Int'];
  startDate?: Scalars['TimelessDate'];
  statusId?: Scalars['String'];
  targetDate?: Scalars['TimelessDate'];
  teamIds: Array<Scalars['String']>;
};

export enum DateResolutionType {
  HalfYear = 'halfYear',
  Month = 'month',
  Quarter = 'quarter',
  Year = 'year',
}

export type ProjectUpdateCreateInput = {
  body?: Scalars['String'];
  health?: ProjectUpdateHealthType;
  id?: Scalars['String'];
  projectId: Scalars['String'];
};

export enum ProjectUpdateHealthType {
  AtRisk = 'atRisk',
  OffTrack = 'offTrack',
  OnTrack = 'onTrack',
}
