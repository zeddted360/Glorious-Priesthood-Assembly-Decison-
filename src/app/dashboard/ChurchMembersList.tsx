"use client";
import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, User, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMembers } from "./page";

const ChurchMembersList = ({ members }: { members: string }) => {
  const Members: IMembers[] = useMemo(() => JSON.parse(members), [members]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter members based on search term
  const filteredMembers = Members.filter(
    (member) =>
      member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.invitedBy?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Calculate soul-winning metrics
  const getMemberInviteCount = (memberName: string | undefined) => {
    return Members.filter((m) => m.invitedBy === memberName).length;
  };
  // Sort members by number of invites (for top soul-winners)
  const topSoulWinners = [...new Set(Members.map((m) => m.invitedBy))]
    .filter(Boolean)
    .map((inviter) => ({
      name: inviter,
      count: getMemberInviteCount(inviter),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Members.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Soul Winners
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topSoulWinners.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Top Soul Winner
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {topSoulWinners[0]?.count || 0} souls
            </div>
            <p className="text-xs text-muted-foreground">
              {topSoulWinners[0]?.name || "No soul winners yet"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search members or soul winners..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Members Table */}
      <Card id="members">
        <CardHeader>
          <CardTitle>Church Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>State/City</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Invited By</TableHead>
                <TableHead>Souls Won</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {member?.fullName}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div>{member?.phone}</div>
                      <div className="text-sm text-muted-foreground">
                        {member?.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell> {member?.city || member.stateOfOrigin}</TableCell>
                  <TableCell>
                    {member?.address}
                    <div className="text-sm text-muted-foreground">
                      {member?.CountryOfOrigin}
                    </div>
                  </TableCell>
                  <TableCell>
                    {member.invitedBy ? (
                      <Badge variant="secondary">{member?.invitedBy}</Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getMemberInviteCount(member.fullName)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Top Soul Winners */}
      <Card>
        <CardHeader>
          <CardTitle>Top Soul Winners</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSoulWinners.map((winner, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-muted-foreground">#{index + 1}</span>
                  <span className="font-medium">{winner.name}</span>
                </div>
                <Badge variant="secondary">{winner.count} souls</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChurchMembersList;
