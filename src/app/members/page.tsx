"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Search, Users } from "lucide-react";
import { AddDepartment } from "@/app/ui/AddDepartment";
import { MemberContext } from "../store/MemberContext";


export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [visitDialogOpen, setVisitDialogOpen] = useState<boolean>(false);
  const [member, setMember] = useState("");
  const { members: Members, dispatch } = React.useContext(MemberContext);

  React.useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/members");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        dispatch({ type: "SET_MEMBERS", payload: data });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers = Members.filter((member) => {
    const matchesSearch =
      member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      filterDepartment === "all" || member.department === filterDepartment;

    return matchesSearch && matchesDepartment;
  });

  const getMemberInviteCount = (memberName: string | undefined) => {
    // note the member name is the fullname
    return Members.filter((m) => m.invitedBy === memberName).length;
  };

  const exportToCSV = () => {
    const headers = [
      "Full Name",
      "State",
      "Country",
      "Phone",
      "Invited By",
      "Email",
      "Date Joined",
      "Department",
    ];

    const csvData = filteredMembers.map((member) => [
      member.fullName,
      member.stateOfOrigin,
      member.countryOfOrigin,
      member.phone,
      member.invitedBy,
      member.email,
      new Date(member.createdAt).toLocaleDateString(),
      member.department,
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "church-members.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <AddDepartment
        visitDialogOpen={visitDialogOpen}
        setVisitDialogOpen={setVisitDialogOpen}
        member={member}
      />
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-primary" />
              <CardTitle>Church Members Directory</CardTitle>
            </div>
            <Button onClick={exportToCSV} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export to CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by name, phone, or email..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select
              value={filterDepartment}
              onValueChange={setFilterDepartment}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="choir">Choir</SelectItem>
                <SelectItem value="ushering">Ushering</SelectItem>
                <SelectItem value="protocol">Protocol</SelectItem>
                <SelectItem value="children">Children</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="none">No Department</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S/N</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>City/lga</TableHead>
                  <TableHead>sex</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Invited By</TableHead>
                  <TableHead>Souls Won</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Date Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Loading members...
                    </TableCell>
                  </TableRow>
                ) : filteredMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No members found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMembers.map((member, index) => (
                    <TableRow key={member._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {member.fullName}
                      </TableCell>
                      <TableCell>{member.countryOfOrigin}</TableCell>
                      <TableCell>{member.stateOfOrigin}</TableCell>
                      <TableCell>{member.city || member.lga}</TableCell>
                      <TableCell>{member.sex}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.invitedBy}</TableCell>
                      <TableCell>
                        {getMemberInviteCount(member.fullName)}
                      </TableCell>
                      <TableCell className="flex items-center justify-center capitalize gap-x-1">
                        {member.department}{" "}
                        {member.department === "none" && (
                          <span
                            onClick={() => {
                              setVisitDialogOpen(true);
                              setMember(member.fullName);
                            }}
                            className="border rounded-md px-2 py-1 cursor-pointer transition-all hover:bg-gray-700 hover:text-gray-200"
                          >
                            add
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(member.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Table Footer */}
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredMembers.length} of {Members.length} members
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
