import List "mo:core/List";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type LeadSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    businessName : Text;
    timestamp : Int;
  };

  module LeadSubmission {
    public func compare(s1 : LeadSubmission, s2 : LeadSubmission) : Order.Order {
      Nat.compare(s1.id, s2.id);
    };
  };

  type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  module ContactSubmission {
    public func compare(s1 : ContactSubmission, s2 : ContactSubmission) : Order.Order {
      Nat.compare(s1.id, s2.id);
    };
  };

  let leadSubmissions = Map.empty<Nat, LeadSubmission>();
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  var nextLeadId = 1;
  var nextContactId = 1;

  public shared ({ caller }) func submitLead(name : Text, email : Text, phone : Text, businessName : Text) : async Nat {
    let id = nextLeadId;
    let submission : LeadSubmission = {
      id;
      name;
      email;
      phone;
      businessName;
      timestamp = Time.now();
    };
    leadSubmissions.add(id, submission);
    nextLeadId += 1;
    id;
  };

  public shared ({ caller }) func submitContact(name : Text, email : Text, message : Text) : async Nat {
    let id = nextContactId;
    let submission : ContactSubmission = {
      id;
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactSubmissions.add(id, submission);
    nextContactId += 1;
    id;
  };

  public query ({ caller }) func getAllLeads() : async [LeadSubmission] {
    leadSubmissions.values().toArray().sort();
  };

  public query ({ caller }) func getAllContacts() : async [ContactSubmission] {
    contactSubmissions.values().toArray().sort();
  };
};
