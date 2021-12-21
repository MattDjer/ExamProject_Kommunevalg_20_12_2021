package com.example.examproject_kommunevalg_20_12_2021.repository;

import com.example.examproject_kommunevalg_20_12_2021.model.PartyScore;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class PartyScoreRepository {

    public static List<PartyScore> getPartyScore() throws SQLException {
        Connection connection = DatabaseConnection.getConnection();
        ArrayList<PartyScore> partyScoresList = new ArrayList<>();

        PreparedStatement statement = connection.prepareStatement("SELECT name, SUM(number_of_votes) as total_votes\n" +
                "FROM party\n" +
                "INNER JOIN candidate\n" +
                "ON party.party_id = candidate.party_id\n" +
                "group by name");

        ResultSet resultSet = statement.executeQuery();

        while (resultSet.next()) {
            String partyName = resultSet.getString("name");
            int partyVotes = resultSet.getInt("total_votes");

            partyScoresList.add(new PartyScore(partyName, partyVotes));
        }
        return partyScoresList;
    }
}
